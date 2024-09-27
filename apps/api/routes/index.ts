import { Router } from "express";
import legalRequests from "./legalRequests";

const router = Router();

// Route to the specific file
router.use("/legal-requests", legalRequests);

export default router;
