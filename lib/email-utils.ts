export function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) {
    // Show time-of-day for same-day emails
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) {
    return new Date(timestamp).toLocaleDateString('en-US', { weekday: 'short' });
  }
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function isExpiringSoon(expiresAt: string | undefined, thresholdMinutes = 30): boolean {
  if (!expiresAt) return false;
  const now = Date.now();
  const expiry = new Date(expiresAt).getTime();
  const diffMin = (expiry - now) / 1000 / 60;
  return diffMin > 0 && diffMin <= thresholdMinutes;
}

export function isExpired(expiresAt: string | undefined): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() < Date.now();
}
