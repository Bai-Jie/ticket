export function getKey(object, value): string | undefined {
  const entry = Object.entries(object).find(it => it[1] === value);
  return entry ? entry[0] : undefined;
}
