export function padZero(val: number, length = 3) {
  return (val + '').padStart(length, '0');
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return arr.length > size
    ? [arr.slice(0, size), ...chunk(arr.slice(size), size)]
    : [arr];
}