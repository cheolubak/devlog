export const jwtDecode = (token: string) => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT token format');
  }

  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const payload = atob(base64);

  const data: {
    exp: number;
    iat: number;
    sub: string;
  } = JSON.parse(payload);

  return data;
};
