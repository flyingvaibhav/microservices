import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  const createSnippet = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      alert("Title and code are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8002/api/v1/snippet", {
        title,
        code,
      });
      const { snippet, message } = res.data;
      setSnippets((prev) => ({ ...prev, [snippet.id]: snippet }));
      setTitle("");
      setCode("");
      alert(message);
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const deleteSnippet = async (id) => {
    try {
      await axios.delete(`http://localhost:8002/api/v1/snippet/${id}`);
      setSnippets((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (error) {
      console.log("error deleting snippet", error);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete("http://localhost:8002/api/v1/snippet");
      setSnippets({});
    } catch (error) {
      console.log("error clearing snippets", error);
    }
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8002/api/v1/snippet");
        setSnippets(res.data);
      } catch (error) {
        console.log("error while fetching snippet", error);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div className="mt-10">
      <form onSubmit={createSnippet} className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded px-2 py-1 w-fit"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="write a code snippets..."
          className="border rounded px-2 py-1"
        />
        <button className="w-fit bg-black text-white px-6 py-2 rounded cursor-pointer">
          Add
        </button>
        <button
          type="button"
          onClick={clearAll}
          className="w-fit border border-black text-black px-6 py-2 rounded cursor-pointer"
        >
          Clear All
        </button>
      </form>

      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <button
              type="button"
              onClick={() => deleteSnippet(snippet.id)}
              className="text-sm text-red-600 underline mb-2"
            >
              Delete
            </button>
            <CreateComment snippet={snippet}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSnippet;