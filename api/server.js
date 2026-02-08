const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "Greet API. GET /greet?name=...&birth_year=..." });
});
app.get("/greet", (req, res) => {
  const name = req.query.name;
  const birthYear = req.query.birth_year;
  if (!name || birthYear === undefined) {
    return res.status(400).json({ error: "name and birth_year are required" });
  }
  const year = parseInt(birthYear, 10);
  if (Number.isNaN(year)) {
    return res.status(400).json({ error: "birth_year must be an integer" });
  }
  const age = new Date().getFullYear() - year;
  res.json({
    greeting: `Hello, ${name}!`,
    age_confirmation: `You are ${age} years old.`,
  });
});
app.listen(PORT, "0.0.0.0", () => console.log(`Listening on ${PORT}`));
