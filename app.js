require("dotenv").config({ path: "./.env" });
const express = require("express");
const tokenRoute = require("./routes/token");
const appRoute = require("./routes/app");
const managementApiRoute = require("./routes/managementApi");
const { join } = require("path");

const app = express();
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("assets"));
app.use(express.json());

app.use("/", appRoute);
app.use("/token", tokenRoute);
app.use("/management", managementApiRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening at 3000");
});
