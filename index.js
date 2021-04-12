const db = require("./config/database");
const express = require("express");
const morgan = require("morgan");
const update = require("./route/update");
const create = require("./route/create");
const read = require("./route/read");
const del = require("./route/del");

const app = express();
//or native libpq bindings
//var pg = require('pg').native
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/update", update);
app.use("/create", create);
app.use("/read", read);
app.use("/delete", del);

app.get("/", async (req, res) => {
  const query = `
  SELECT * FROM Note
  ORDER BY id;
  `;
  const { rows } = await db.query(query);

  res.render("index", { item: rows });
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
