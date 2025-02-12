export function sanitizeEntity<T, K extends keyof T>(
  entity: T,
  keys: K[],
): Omit<T, K> {
  const sanitizedEntity = { ...entity };
  keys.forEach((key) => delete sanitizedEntity[key]);
  return sanitizedEntity;
}
