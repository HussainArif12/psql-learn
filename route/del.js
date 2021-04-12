const express = require("express");
const router = express.Router();
const db = require("../config/database");
router.get("/:id", async (req, res) => {
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

module.exports = router;
