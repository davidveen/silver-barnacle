export function padZero(val: number, length = 3) {
  return (val + '').padStart(length, '0');
}