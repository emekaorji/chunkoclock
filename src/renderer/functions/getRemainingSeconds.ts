export default function getRemainingSeconds(futureTime: number): number {
  const remainingSeconds =
    new Date(futureTime).getTime() - new Date().getTime();
  return Math.round(remainingSeconds / 1000);
}
