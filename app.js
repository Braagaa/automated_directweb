require("dotenv").config({ path: "./.env" });
const express = require("express");
const serveStatic = require("serve-static");
const tokenRoute = require("./routes/token");
const appRoute = require("./routes/app");
const { join } = require("path");

const app = express();
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("assets"));
app.use(express.json());

app.use("/token", tokenRoute);
app.use("/", appRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening at 3000");
});
