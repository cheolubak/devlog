export function getAdminApiHeaders(): Record<string, string> {
  const key = process.env.AUTH_KEY;
  if (!key) throw new Error('AUTH_KEY is not configured');
  return { 'x-admin-api-key': key };
}
