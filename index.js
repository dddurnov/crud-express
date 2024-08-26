import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
