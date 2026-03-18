export const jwtDecode = (token: string) => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT token format');
  }

  const payload = atob(parts[1]);

  const data: {
    exp: number;
    iat: number;
    sub: string;
  } = JSON.parse(payload);

  return data;
};
