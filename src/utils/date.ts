export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`;
}
