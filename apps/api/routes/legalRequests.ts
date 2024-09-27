import { Router, Request, Response } from "express";
import { validateName } from "../middleware/legalRequests";
import { listParams } from "../types/legalRequests";
import { getRequestsByAuthor } from "../services/legalRequests";

const router = Router();

router.get("/list/:name", validateName, (req: Request<listParams>, res: Response) => {
    const { name } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const results = getRequestsByAuthor(name);

    // If there are no results, return a 404
    if (results.length === 0) {
        return res.status(404).json({ message: "No requests found for the specified author." });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return res.status(200).json({
        totalResults: results.length,
        totalPages: Math.ceil(results.length / limit),
        currentPage: page,
        data: paginatedResults
    });
});

export default router;
