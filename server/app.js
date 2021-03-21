require("dotenv").config({ path: "./.env" });
const express = require("express");
const serveStatic = require("serve-static");
const tokenRoute = require("./routes/token");
const path = require("path");

const app = express();
app.use(express.json());

app.use("/token", tokenRoute);
app.get("*", serveStatic(path.join(__dirname, "..", "dist")));
app.get(/.*/, (_, res) =>
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
);

app.listen(process.env.PORT || 3001, () => {
  console.log("Listening at 3001");
});
