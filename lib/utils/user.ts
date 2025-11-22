import { authClient } from "../auth-client";

export const getUserSessionData = async () => {
  const session = await authClient.getSession();
  return session;
};
