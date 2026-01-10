import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import {
  generateFacebookReview,
  GenerateFacebookReviewInput,
} from "./flows/generate-facebook-review";
import { generateReview, GenerateReviewInput } from "./flows/generate-review";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for the Next.js frontend
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (_req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Google Review API endpoint
app.post("/api/generate-review", async (req: Request, res: Response) => {
  try {
    const input: GenerateReviewInput = req.body;

    if (!input.topic) {
      res.status(400).json({ error: "topic is required" });
      return;
    }

    const result = await generateReview(input);
    res.json(result);
  } catch (error) {
    console.error("Error generating review:", error);
    res.status(500).json({ error: "Failed to generate review" });
  }
});

// Facebook Review API endpoint
app.post(
  "/api/generate-facebook-review",
  async (req: Request, res: Response) => {
    try {
      const input: GenerateFacebookReviewInput = req.body;

      if (!input.topic) {
        res.status(400).json({ error: "topic is required" });
        return;
      }

      const result = await generateFacebookReview(input);
      res.json(result);
    } catch (error) {
      console.error("Error generating Facebook review:", error);
      res.status(500).json({ error: "Failed to generate Facebook review" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log(`  POST /api/generate-review - Generate Google review`);
  console.log(
    `  POST /api/generate-facebook-review - Generate Facebook review`
  );
});
