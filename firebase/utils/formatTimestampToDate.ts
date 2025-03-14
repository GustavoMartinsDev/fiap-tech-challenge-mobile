import { Timestamp } from 'firebase/firestore';

export const formatTimestampToDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
  }).format(date);
};
