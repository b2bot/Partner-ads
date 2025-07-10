import re
import sys
from csv import reader

infile = sys.argv[1]
outfile = sys.argv[2]

skip_patterns = [
    r'^SET ',
    r'^SELECT pg_catalog.set_config',
    r'^-- Dumped',
    r'^COMMENT ON EXTENSION',
    r'^CREATE EXTENSION',
    r'^ALTER EXTENSION',
    r'^COMMENT ON SCHEMA',
    r'^ALTER SCHEMA',
    r'^ALTER TABLE ONLY',
    r'^ALTER TABLE .* OWNER TO',
    r'^ALTER TABLE .* SET',
    r'^CREATE SCHEMA',
    r'^ALTER SEQUENCE',
    r'^CREATE SEQUENCE',
    r'^GRANT ',
    r'^REVOKE ',
    r'^COMMENT ON TABLE',
    r'^COMMENT ON COLUMN',
    r'^CREATE POLICY',
    r'^ALTER POLICY',
    r'^CREATE FUNCTION',
    r'^CREATE TRIGGER',
    r'^CREATE EVENT TRIGGER',
    r'^ALTER FUNCTION',
    r'^COMMENT ON FUNCTION',
    r'^CREATE OR REPLACE FUNCTION',
    r'^ALTER TYPE',
    r'^ALTER EVENT TRIGGER',
]

pattern_compiled = [re.compile(p) for p in skip_patterns]

def should_skip(line: str) -> bool:
    for p in pattern_compiled:
        if p.search(line):
            return True
    return False

enum_defs: dict[str, list[str]] = {}

def transform_line(line: str) -> str:
    line = line.replace('"', '`')
    line = re.sub(r'::[a-zA-Z_ ]+', '', line)
    line = re.sub(r'^(\s*[`"\w]+\s+)boolean\b', r'\1tinyint(1)', line)
    line = re.sub(r'^(\s*[`"\w]+\s+)uuid\b', r'\1char(36)', line)
    line = re.sub(r'timestamp with time zone', 'timestamp', line)
    line = re.sub(r'timestamp without time zone', 'timestamp', line)
    line = re.sub(r'timestamptz', 'timestamp', line)
    line = re.sub(r'jsonb', 'json', line)
    line = re.sub(r'char\(36\)\[\]', 'json', line)
    line = re.sub(r'^(\s*[`"\w]+\s+)serial\b', r'\1int auto_increment', line)
    line = re.sub(r'^(\s*[`"\w]+\s+)bigserial\b', r'\1bigint auto_increment', line)
    line = re.sub(r'now\(\)', 'CURRENT_TIMESTAMP', line)
    line = re.sub(r'nextval\([^)]*\)', 'NULL', line)
    line = re.sub(r'::character varying', '', line)
    line = line.replace('public.', '')
    line = line.replace('auth.', '')
    line = line.replace('gen_random_uuid()', 'UUID()')
    return line

with open(infile) as f:
    lines = f.readlines()

out_lines: list[str] = []
i = 0
while i < len(lines):
    line = lines[i]

    if line.startswith('COPY '):
        m = re.match(r"COPY ([^ ]+) \(([^\)]+)\) FROM stdin;", line)
        table = m.group(1).replace('public.', '').replace('auth.', '')
        cols = [c.strip().strip('"') for c in m.group(2).split(',')]
        i += 1
        while i < len(lines) and lines[i].strip() != '\\.':
            row = lines[i].rstrip('\n')
            values = []
            for val in reader([row], delimiter='\t', quoting=3).__next__():
                if val == '\\N':
                    values.append('NULL')
                else:
                    values.append("'" + val.replace("'", "''") + "'")
            out_lines.append(f"INSERT INTO {table} ({', '.join(cols)}) VALUES ({', '.join(values)});\n")
            i += 1
        i += 1
        continue

    if line.startswith('CREATE TYPE') and 'AS ENUM' in line:
        name_match = re.match(r'CREATE TYPE ([^ ]+) AS ENUM \(', line)
        enum_name = name_match.group(1)
        if '.' in enum_name:
            enum_name = enum_name.split('.')[-1]
        vals = []
        i += 1
        while i < len(lines):
            val_line = lines[i].strip()
            if val_line.endswith(');'):
                val_line = val_line[:-2].rstrip(',')
                if val_line:
                    vals.append(val_line.strip("'"))
                break
            vals.append(val_line.rstrip(',').strip("'"))
            i += 1
        enum_defs[enum_name] = vals
        i += 1
        continue

    if line.strip().startswith('CREATE FUNCTION'):
        while i < len(lines) and not lines[i].strip().endswith('$$;') and not lines[i].strip().endswith('$_$;'):
            i += 1
        i += 1
        continue

    if should_skip(line.strip()):
        i += 1
        continue

    out_lines.append(transform_line(line))
    i += 1

final_lines: list[str] = []
for l in out_lines:
    if not l.lstrip().startswith('INSERT INTO') and not l.lstrip().startswith('--'):
        for name, vals in enum_defs.items():
            l = re.sub(rf"'([^']*)'\.{re.escape(name)}", r"'\1'", l)
            l = re.sub(rf"(?<!['`])\b{re.escape(name)}\b(?!['`])", "ENUM('" + "','".join(vals) + "')", l)
    final_lines.append(l)

with open(outfile, 'w') as out:
    out.writelines(final_lines)
