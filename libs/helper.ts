export function formatReadableDate(dateString: string): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export function formatSortDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Get day with leading zero if needed
  const day = date.getDate().toString().padStart(2, '0');
  
  // Get abbreviated month (Jan, Feb, etc)
  const month = date.toLocaleString('en-US', { month: 'short' });
  
  // Get last two digits of year
  const year = date.getFullYear().toString().slice(-2);
  
  return `${day} ${month} ${year}`;
}