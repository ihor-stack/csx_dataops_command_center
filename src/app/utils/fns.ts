export function getTail3Count(arrLen: number) {
  const tmp = arrLen % 3;
  return tmp ? Array(3 - tmp).fill(0) : [];
}
