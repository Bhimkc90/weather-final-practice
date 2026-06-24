const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        weather: null,
        type: null,
        units: null,
        error: null
    });
});



app.get("/search", async (req, res) => {
    const city = req.query.city;
    const units = req.query.units || "metric";
    const lang = req.query.lang || "en";
    const type = req.query.type || "today";
    const apiKey = process.env.OPENWEATHER_API_KEY;

    try {
        let url;

        if (type === "5day") {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
        }

        const response = await axios.get(url);

        res.render("index", {
            weather: response.data,
            type: type,
            units: units,
            error: null
        });

    } catch (error) {
        res.render("index", {
            weather: null,
            type: type,
            units: units,
            error: "City not found. Please try again."
        });
    }
});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});