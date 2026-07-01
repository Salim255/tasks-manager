const DEMO_CLIENT_ID_KEY = "tm_demo_client_id";

export const getDemoClientId = (): string => {
  let clientId = localStorage.getItem(DEMO_CLIENT_ID_KEY);

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(DEMO_CLIENT_ID_KEY, clientId);
  }

  return clientId;
};