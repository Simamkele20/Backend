import { config } from "dotenv";
import fetch from "node-fetch";

config();

class AuthenticateUser {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRECT;
  }

  async getAccessToken() {
    const response = await fetch(
      `${this.apiUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  }
}

export { AuthenticateUser };
