import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
let data;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    data = response.data;
    // console.log(data)
    res.render("index.ejs", { result: data });
  } catch (error) {
    console.error("Failed to fetch:", error.message);
    res.render("index.ejs", { errorMsg: error.message });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const result = response.data;
    data = result[Math.floor(Math.random() * result.length)];
    // console.log(data)
    res.render("index.ejs", { result: data });
  } catch (error) {
    console.error("Failed to fetch:", error.message);
    res.render("index.ejs", { errorMsg: "No activities that match your criteria" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
