import { pool } from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Ошибка выполнения запроса SELECT:", err.message);
    res.status(500).send("Server error");
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка выполнения запроса SELECT:", err.message);
    res.status(500).send("Server error");
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Необходимо указать имя и email");
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка выполнения запроса INSERT:", err.message);
    res.status(500).send("Server error");
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Необходимо указать имя и email");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка выполнения запроса UPDATE:", err.message);
    res.status(500).send("Server error");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка выполнения запроса DELETE:", err.message);
    res.status(500).send("Server error");
  }
};
