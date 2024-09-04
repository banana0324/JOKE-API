import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL+"Programming");
        // console.log(JSON.stringify(result.data));
        // res.render("index.ejs",{data : JSON.stringify(result.data)});
        // res.render("index.ejs",{setup:result.data.setup,delivery:result.data.delivery});
        res.render("index.ejs",{data : result.data});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
    }
});

app.post("/", async (req, res) => {    
    try {
        const result = await axios.get(API_URL + req.body.category);
        console.log(result);
        res.render("index.ejs",{data : result.data});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No activities that match your criteria.",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});