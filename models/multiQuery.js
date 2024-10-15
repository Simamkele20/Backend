import Fetch from "node-fetch";
import { AuthenticateUser } from "../middleware/AuthenticateUser.js";


class MultiQuery {
  constructor() {
    this.apiUrl = process.env.MultiQuery_URL;
    this.myHeaders = new Headers();
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Client-ID", process.env.CLIENT_ID);
    this.myHeaders.append("Content-Type", "text/plain");
  }

  async initialize() {
    const authUser = new AuthenticateUser();
    const token = await authUser.getAccessToken();
    this.myHeaders.append("Authorization", `Bearer ${token}`);
  }
  async fetchDisplayAll(req, res) {
    const query = `query games "GameDisplay" {
        fields name, platforms.name, genres.name, summary, first_release_date, cover.url;
  };
   
      
`;

    const requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: query,
      redirect: "follow",
    };
    try {
      const response = await fetch(this.apiUrl, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from IGDB:", errorText);
        return res.status(response.status).json({
          status: response.status,
          msg: "Failed to fetch Multi-Query data from IGDB.",
        });
      }

      const result = await response.json();
      res.json({
        status: res.statusCode,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching Multi-Query:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching Multi-Query data. Please try again later.",
      });
    }
  }
  async fetchsearch(req, res) {
    const gameName = req.params.name;
    const query = `query games "GameSearch" {
        fields name, platforms.name, genres.name, summary, first_release_date, cover.url;
        search ${gameName};
  };
   
      
`;
    const requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: query,
      redirect: "follow",
    };
    try {
      const response = await fetch(this.apiUrl, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from IGDB:", errorText);
        return res.status(response.status).json({
          status: response.status,
          msg: "Failed to fetch Multi-Query data from IGDB.",
        });
      }

      const result = await response.json();
   
      res.json({
        status: res.statusCode,
        data: filteredResults,
      });
    } catch (error) {
      console.error("Error fetching Multi-Query:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching Multi-Query data. Please try again later.",
      });
    }
  }
  async fetchDisplayByID(req, res) {
    const gameId = req.params.id;
    const query = `query games "GameDetailView" {
        fields name, platforms.name, genres.name, summary, release_dates.human, cover.url,involved_companies,  involved_companies.publisher,websites.url, game_modes.name, videos.video_id;
          where id = ${gameId};
          
  };      
`;

    const requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: query,
      redirect: "follow",
    };

    try {
      const response = await fetch(this.apiUrl, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from IGDB:", errorText);
        return res.status(response.status).json({
          status: response.status,
          msg: "Failed to fetch Multi-Query data from IGDB.",
        });
      }

      const result = await response.json();

      res.json({
        status: res.statusCode,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching Multi-Query:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching Multi-Query data. Please try again later.",
      });
    }
  }
}

export { MultiQuery };
