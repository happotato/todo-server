const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

require('dotenv').config()

const { PORT } = process.env;

const app = express();

const pgClient = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

pgClient.connect()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.get("/api/todos", async (_req, res) => {
  const queryResult = await pgClient.query('SELECT * FROM items ORDER BY "createdAt" DESC');
  res.send(queryResult.rows);
});

app.post("/api/todos", async (req, res) => {
  const json = req.body;

  const now = new Date();
  const id = crypto.randomBytes(16).toString("hex");
  const title = json["title"];
  const description = json["description"] || "";

  const queryText = 'INSERT INTO items VALUES ($1, $2, $3, $4, $5, $5) RETURNING *';
  const queryResult = await pgClient.query(queryText, [
    id,
    title,
    description,
    false,
    now
  ]);

  res.send(queryResult.rows[0]);
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params["id"];

  await pgClient.query('DELETE FROM items WHERE "id" = $1', [id]);
  res.end();
});

app.post("/api/todos/:id", async (req, res) => {
  const json = req.body;

  const now = new Date();
  const id = req.params["id"];

  const queryText = `
    UPDATE items SET
    "title" = $2,
    "description" = $3,
    "done" = $4,
    "lastModified" = $5
    WHERE "id" = $1
    RETURNING *
  `;

  const queryResult = await pgClient.query(queryText, [
    id,
    json["title"],
    json["description"],
    json["done"],
    now,
  ]);

  res.send(queryResult.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Listening to :${PORT}`);
});
