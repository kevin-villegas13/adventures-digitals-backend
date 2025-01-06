import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.routes";
import productRoutes from "./product/product.routes";
import userRoutes from "./user/user.routes";
import { AppDataSource } from "./database/database";
import { insertRolesIfNotExist } from "./database/init";

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
app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    // Inicializar la base de datos
    await AppDataSource.initialize();
    await insertRolesIfNotExist();
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
