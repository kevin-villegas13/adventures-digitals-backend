import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.routes";
import { AppDataSource } from "./database/database";

dotenv.config();

const app = express();

// Definir el puerto a partir de la variable de entorno o usar un valor predeterminado
const PORT = process.env.PORT;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/auth", authRoutes);

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
