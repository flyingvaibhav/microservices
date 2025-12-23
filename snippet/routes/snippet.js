import express from "express";
import { createSnippet, getSnippet, deleteSnippet, clearSnippets } from "../controller/snippet.js";

const router = express.Router();

router.route("/").post(createSnippet);
router.route("/").get(getSnippet);
router.route("/").delete(clearSnippets);
router.route("/:id").delete(deleteSnippet);

export default router;