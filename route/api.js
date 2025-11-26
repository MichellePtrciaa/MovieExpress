import express from "express";
import * as movieController from "../controllers/movieController.js";
import * as userController from "../controllers/userController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const router = express.Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);

router.post("/movie", authenticateTokenMiddleware, movieController.createMovie);
router.get("/movie", authenticateTokenMiddleware, movieController.listMovie);
router.get("/movie/:id", authenticateTokenMiddleware, movieController.detailMovie);
router.put("/movie/:id", authenticateTokenMiddleware, movieController.updateMovie);
router.delete("/movie/:id", authenticateTokenMiddleware, movieController.deleteMovie);

export default router;
