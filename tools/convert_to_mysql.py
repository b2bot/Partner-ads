

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
