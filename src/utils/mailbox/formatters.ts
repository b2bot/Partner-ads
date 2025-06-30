
import { format, formatDistanceToNow } from 'date-fns';

export const formatMessageDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return format(date, 'HH:mm');
  } else if (diffInDays < 7) {
    return format(date, 'EEE');
  } else {
    return format(date, 'dd/MM/yyyy');
  }
};

export const formatRelativeDate = (dateString: string): string => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const extractEmailName = (email: string): string => {
  const parts = email.split('@');
  return parts[0] || email;
};

export const formatParticipants = (participants: string[]): string => {
  if (participants.length <= 2) {
    return participants.join(', ');
  }
  return `${participants.slice(0, 2).join(', ')} +${participants.length - 2}`;
};
