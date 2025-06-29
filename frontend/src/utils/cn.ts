export function cn(...rest: Array<string | undefined>) {
  return rest.filter(Boolean).join(' ');
}
