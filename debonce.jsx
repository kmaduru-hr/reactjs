import React, { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        const data = await response.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      {results.items?.map((item) => (
        <div key={item.id}>{item.login}</div>
      ))}
    </div>
  );
}
