import axios from "axios";
import { storeToken, validateToken } from "../db/db_helper.js";
import { secrets } from "./secrets.js";
import { Request } from 'express';

const assembleTokenUrl = (baseUrl: string, authCode: string) => {
  const url = new URL('https://oauth2.googleapis.com/token');
  url.searchParams.set('code', authCode);
  url.searchParams.set('redirect_uri', `${baseUrl}/login-redirect`);
  url.searchParams.set('client_id', secrets.client_id);
  url.searchParams.set('client_secret', secrets.client_secret);
  url.searchParams.set('grant_type', 'authorization_code');
  return url.toString();
}

const getTokens = async (baseUrl: string, authCode: string) => {
  const res = await axios.post(assembleTokenUrl(baseUrl, authCode));
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

export const login = async (req: Request, authCode: string) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const tokens = await getTokens(baseUrl, authCode);
  const email = await getEmail(tokens.access_token);
  await storeToken(email, tokens.refresh_token);
  return {refresh_token: tokens.refresh_token, email};
}

export const authenticate = async (email: string, token: string): Promise<boolean> => {
  return validateToken(email, token);
}