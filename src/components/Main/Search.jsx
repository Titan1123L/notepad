import { CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from "react";

function Search({ notes, setNotes, fetchNotes }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    const filteredNotes = notes.filter((note) => {
      const titleMatch = note.title.toLowerCase().includes(query.toLowerCase());
      const taglineMatch = note.tagline
        .toLowerCase()
        .includes(query.toLowerCase());
      const bodyMatch = note.noteBody
        .toLowerCase()
        .includes(query.toLowerCase());

      return titleMatch || taglineMatch || bodyMatch;
    });

    setNotes(filteredNotes);
  };

  useEffect(() => {
    if (!search) {
      fetchNotes();
    }
  }, [search]);

  return (
    <div
      className="flex gap-2 items-center w-fit rounded-md py-1 border-b border-white hover:border-gray-200 transition"
      style={{
        backgroundColor: "var(--search-bg)",
        color: "var(--text-color)",
      }}
    >
      <CiSearch size={23} className="text-gray-700" />
      <input
        type="text"
        placeholder="Search notes"
        className="text-gray-500 text-lg font-semibold outline-none"
        value={search}
        onChange={(e) => {
          handleSearch(e);
        }}
        style={{
          backgroundColor: "var(--search-bg)",
          color: "var(--text-color)",
        }}
      />
    </div>
  );
}

export default Search;
