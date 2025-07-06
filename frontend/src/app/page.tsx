"use client";
import React, { useState } from "react";

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [touched, setTouched] = useState(false);

  const fetchRepos = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setLoading(true);
    setError("");
    setRepos([]);
    try {
      const res = await fetch(
        `/api/repos?username=${encodeURIComponent(username)}`
      );
      if (!res.ok) throw new Error("User not found or error fetching repos.");
      const data = await res.json();
      setRepos(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(filter.toLowerCase()) ||
      (repo.description?.toLowerCase().includes(filter.toLowerCase()) ?? false)
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 bg-[#18181b] text-[#f3f3f3] font-jetbrains">
      <h1 className="text-4xl font-bold mb-2 tracking-tight text-[#f3f3f3]">
        Repo Finder
      </h1>
      <form
        onSubmit={fetchRepos}
        className="flex flex-col sm:flex-row gap-2 items-center w-full max-w-xl"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-[#333] bg-[#23232a] text-[#f3f3f3] rounded px-3 py-2 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#6c63ff] font-jetbrains"
          required
        />
        <button
          type="submit"
          className="bg-[#6c63ff] text-white px-4 py-2 rounded hover:bg-[#5548c8] transition-colors font-bold font-jetbrains"
        >
          Search
        </button>
      </form>
      {loading && (
        <div className="text-[#6c63ff] font-semibold">Loading...</div>
      )}
      {error && <div className="text-red-400 font-semibold">{error}</div>}
      {!loading && !error && touched && repos.length === 0 && (
        <div className="text-[#aaa]">No repositories found.</div>
      )}
      {repos.length > 0 && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter repositories"
            className="border border-[#333] bg-[#23232a] text-[#f3f3f3] rounded px-3 py-2 text-base mb-2 focus:outline-none focus:ring-2 focus:ring-[#6c63ff] font-jetbrains"
          />
          <ul className="space-y-2">
            {filteredRepos.length === 0 ? (
              <li className="text-[#aaa]">No repositories match your filter.</li>
            ) : (
              filteredRepos.map((repo) => (
                <li
                  key={repo.name}
                  className="border border-[#333] rounded p-4 flex flex-col gap-1 bg-[#23232a] shadow font-jetbrains"
                >
                  <span className="font-semibold text-lg text-[#f3f3f3]">
                    {repo.name}
                  </span>
                  <span className="text-[#b3b3b3] text-sm">
                    {repo.description || "No description"}
                  </span>
                  <span className="text-[#ffe066] text-xs font-mono">
                    ⭐ {repo.stargazers_count}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap");
        .font-jetbrains {
          font-family: "JetBrains Mono", monospace;
        }
      `}</style>
    </div>
  );
}
