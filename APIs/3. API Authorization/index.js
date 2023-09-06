import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "normie";
const yourPassword = "123456789";
const yourAPIKey = "b430aab0-d1ff-4aa5-9462-436959780ea2";
const yourBearerToken = "750ee76e-984d-4167-ad9b-2e69930e77ad";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random")
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    console.error("Failed to fetch at /noAuth:", error.message)
    res.send(error.message)
  }
});

app.get("/basicAuth", async (req, res) => {
  const config = {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  };

  try {
    const response = await axios.get(API_URL + "/all?page=2", config)
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    console.error("Failed to fetch at /basicAuth:", error.message)
    res.send(error.message)
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter?score=6&apiKey=${yourAPIKey}`)
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    console.error("Failed to fetch at /apiKey:", error.message)
    res.send(error.message)
  }
});

app.get("/bearerToken", async (req, res) => {
  const config = {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    }
  };

  try {
    const response = await axios.get(API_URL + "/secrets/42", config)
    res.render("index.ejs", { content: JSON.stringify(response.data) })
  } catch (error) {
    console.error("Failed to fetch at /bearerToken:", error.message)
    res.send(error.message)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
