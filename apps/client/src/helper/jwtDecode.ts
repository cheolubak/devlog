export const jwtDecode = (token: string) => {
  const splited = token.split('.');
  const payload = atob(splited[1]);

  const data: {
    exp: number;
    iat: number;
    sub: string;
  } = JSON.parse(payload);

  return data;
};
