const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const getDataFromFile = (cb) => {
  fs.readFile("data/movies.json", "utf8", (error, data) => {
    if (error) {
      cb([]);
    }
    cb(data);
  });
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors);
app.get("/getMovies", function (req, res, next) {
  getDataFromFile((data) => {
    // console.log(data);
    res.type("json");
    res.send(data);
    res.end();
  });
});
app.post("/updateMovieDetails", function (req, res, next) {
  getDataFromFile((data) => {
    let details = JSON.parse(Object.keys(req.body)[0]);
    data = JSON.parse(data);
    data = data.map((item) => {
      if (item.id == details.id) {
        return { ...item, ...details };
      }
      return item;
    });
    fs.writeFile("data/movies.json", JSON.stringify(data), (error) => {
      if (error) {
        res.status(404);
        res.end();
      } else {
        res.status(200);
        res.send("OK");
        res.end();
      }
    });
  });
});
app.listen(8000);
