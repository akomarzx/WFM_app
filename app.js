const express = require("express");
const app = express();
const path = require("path");

// Set Up View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan Logging
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

app.get("/", (req, res) => {
  res.render("basicUserIndexPage");
});


app.use((err, req, res, next) => {
  console.log(err?.message);
});

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Currently in ${process.env.NODE_ENV} mode`);
  console.log(`Server Active at port ${process.env.PORT}`);
});
