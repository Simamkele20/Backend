import { config } from "dotenv";
import axios from "axios";
import https from "https";
config();

class AuthenticateUser {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
  }

  async getAccessToken() {
    const params = new URLSearchParams();
    params.append("client_id", this.clientId);
    params.append("client_secret", this.clientSecret);
    params.append("grant_type", "client_credentials");

    try {
      const response = await axios.post(this.apiUrl, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }), 
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export { AuthenticateUser };
