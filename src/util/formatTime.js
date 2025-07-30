export function formatTimeAgo(timestamp) {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const difference = now - createdAt;

  if (difference < 60 * 1000) {
    return `${Math.floor(difference / 1000)} seconds ago`;
  } else if (difference < 60 * 60 * 1000) {
    return `${Math.floor(difference / (1000 * 60))} minutes ago`;
  } else if (difference < 24 * 60 * 60 * 1000) {
    return `${Math.floor(difference / (1000 * 60 * 60))} hours ago`;
  } else {
    return `${Math.floor(difference / (1000 * 60 * 60 * 24))} days ago`;
  }
}
