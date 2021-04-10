const { Pool } = require("pg");
const connectionString =
  "postgres://laeqdhvt:NrU-3HvJFaFe0ONHDveAd051RycEOuc-@queenie.db.elephantsql.com:5432/laeqdhvt";

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
