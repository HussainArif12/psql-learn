const db = require("./config/database");
const express = require("express");
const morgan = require("morgan");
const update = require("./route/update");
const create = require("./route/create");
const read = require("./route/read");
const app = express();
//or native libpq bindings
//var pg = require('pg').native
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/update", update);
app.use("/create", create);
app.use("/read", read);
app.get("/", async (req, res) => {
  const query = `
  SELECT * FROM Note
  ORDER BY id;
  `;
  const { rows } = await db.query(query);

  res.render("index", { item: rows });
});

app.get("/delete/:id", async (req, res) => {
  const query = ` 
  DELETE FROM Note
  WHERE id=$1
  RETURNING *;
  `;
  const values = [req.params.id];
  db.query(query, values)
    .then((res) => console.log(res.rows[0]))
    .catch((e) => console.log(e));
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
