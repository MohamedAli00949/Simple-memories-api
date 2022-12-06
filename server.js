const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/api/", async (req, res) => {
  res.send("<h1>Hello, world</h1>");
});

const Data = require("./db/fackMemorise.js");
// Endpoint
app.get("/api/memories/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const memoriesData = Data.findAll(),
      realPage = Number(page) - 1 || 0,
      realLimit = Number(limit) || 25,
      startIndex = realLimit * realPage,
      data = memoriesData.slice(startIndex, startIndex + realLimit);

    res.status(200).json({
      data,
      total: memoriesData.length,
      currentPage: page,
      numberOfPages: Math.ceil(memoriesData.length / realLimit)
    });

  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error?.message || "Some thing wrong at server or your code"
      });
    console.log(error);
  }
});

app.get('/api/memories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const data = Data.findOne(Number(id));

    if (data === -1)
      return res
        .status(404)
        .json({ message: "Not founded data for this id." });

    res.status(200).json(data);

  } catch (error) {
    res
      .status(500)
      .json({
        message:
          error?.message || "Some thing wrong at server or your code"
      });
    console.log(error);
  }
});

module.exports = app;