const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;
const articles = [];
// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');

        articles.push({
          title,
          url,
        });
      });
      res.json(articles);

        console.log(articles)
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
