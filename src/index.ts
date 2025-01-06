import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.routes";
import { AppDataSource } from "./database/database";
import productRoutes from "./product/product.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    // Inicializar la base de datos
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
};

// Llamar a la función para arrancar el servidor
startServer();
