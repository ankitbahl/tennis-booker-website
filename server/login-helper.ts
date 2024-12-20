import axios from "axios";
import {storeToken, validateToken} from "../db/db_helper.js";
import {secrets} from "./secrets.js";

const assembleTokenUrl = (authCode: string) => {
  const url = new URL('https://oauth2.googleapis.com/token');
  url.searchParams.set('code', authCode);
  url.searchParams.set('redirect_uri', 'http://localhost:5000/login-redirect');
  url.searchParams.set('client_id', secrets.client_id);
  url.searchParams.set('client_secret', secrets.client_secret);
  url.searchParams.set('grant_type', 'authorization_code');
  return url.toString();
}

const getTokens = async (authCode: string) => {
  const res = await axios.post(assembleTokenUrl(authCode));
  return {refresh_token: res.data.refresh_token, access_token: res.data.access_token};
}

const getEmail = async (accessToken: string) => {
  const url = `https://www.googleapis.com/gmail/v1/users/me/profile`;
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const res = await axios.get(url, { headers })
  return res.data.emailAddress;
}

export const login = async (authCode: string) => {
  const tokens = await getTokens(authCode);
  const email = await getEmail(tokens.access_token);
  await storeToken(email, tokens.refresh_token);
  return {refresh_token: tokens.refresh_token, email};
}

export const authenticate = async (email: string, token: string): Promise<boolean> => {
  return validateToken(email, token);
}