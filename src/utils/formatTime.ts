export function formatTime(ms: number): string {
  if (ms <= 0) return '0 сек.';

  const seconds: number = Math.floor((ms / 1000) % 60);
  const minutes: number = Math.floor((ms / (1000 * 60)) % 60);
  const hours: number = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days: number = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}дн.`);
  if (hours > 0) parts.push(`${hours}ч.`);
  if (minutes > 0) parts.push(`${minutes}мин.`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}сек.`);

  return parts.join(' ');
}
