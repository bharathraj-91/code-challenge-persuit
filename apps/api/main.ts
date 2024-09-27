import express from "express";
import cors from "cors"
import router from "./routes/index";
import handleUnknownRoutes from "./middleware/unknownRoutes";


export const app = express();
const port = 3001;

// Middlewares
app.use(cors())

// Routes
app.use("/api", router);

app.use(handleUnknownRoutes);

// App start
app.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
