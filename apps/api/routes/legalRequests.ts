import { Router, Request, Response } from "express";
import { validateName } from "../middleware/legalRequests";
import { listParams } from "../types/legalRequests";
import { getRequestsByAuthor } from "../services/legalRequests";

const router = Router();

router.get("/list/:name", validateName, (req: Request<listParams>, res: Response) => {
    const { name } = req.params;

    const results = getRequestsByAuthor(name);

    // If there are no results, return a 404
    if (results.length === 0) {
        return res.status(404).json({ message: "No requests found for the specified author." });
    }

    return res.status(200).json(results);
});

export default router;
