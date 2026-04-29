export function generateRandomDOB(): string {
  const start = new Date(1985, 0, 1);
  const end = new Date(2005, 11, 31);
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const date = new Date(randomTime);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
