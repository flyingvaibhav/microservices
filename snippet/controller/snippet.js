import { snippets } from "../database/index.js"
import {randomBytes} from "crypto";


export const createSnippet = (req,res) => {
    const id = randomBytes(4).toString('hex');

    const {title, code} = req.body;

    if (!title || !code) {
        return res.status(400).json({ success: false, message: "Title and code are required" });
    }

    // creating a snippet
    snippets[id] = {
        id,
        title,
        code
    }
    return res.status(201).json({
        success:true,
        snippet:snippets[id],
        message:"Snippet created successfully."
    });

};

export const getSnippet = (_, res) => {
    return res.status(200).json(snippets);
}

export const deleteSnippet = (req, res) => {
    const { id } = req.params;
    if (!snippets[id]) {
        return res.status(404).json({ success: false, message: "Snippet not found" });
    }
    delete snippets[id];
    return res.status(200).json({ success: true, message: "Snippet deleted" });
};

export const clearSnippets = (_req, res) => {
    for (const key of Object.keys(snippets)) {
        delete snippets[key];
    }
    return res.status(200).json({ success: true, message: "All snippets cleared" });
};