import { OAUTH_STATE_KEY } from 'constants/auth';
import { cookies } from 'next/headers';

import { safeCompare } from './safeCompare';

export const verifyOAuthState = async (
  callbackState: null | string,
): Promise<boolean> => {
  const cookieStore = await cookies();
  const storedState = cookieStore.get(OAUTH_STATE_KEY)?.value;

  cookieStore.delete(OAUTH_STATE_KEY);

  if (!storedState || !callbackState) {
    return false;
  }

  return safeCompare(storedState, callbackState);
};
