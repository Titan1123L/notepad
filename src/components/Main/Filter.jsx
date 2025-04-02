import React from "react";
import { BiSort } from "react-icons/bi";

function Filter({ onSortChange }) {
  return (
    <div className="flex items-center cursor-pointer">
      <BiSort size={22} className="text-gray-700" />
      <select
        name="sorting"
        className="outline-none text-gray-700 cursor-pointer rounded p-1"
        onChange={(e) => onSortChange(e.target.value)}
        style={{
          backgroundColor: "var(--search-bg)",
          color: "var(--text-color)",
        }}
      >
        <option value="Oldest first">Oldest first</option>
        <option value="Newest first">Newest first</option>
        <option value="Alphabetical A-Z">Alphabetical A-Z</option>
        <option value="Alphabetical Z-A">Alphabetical Z-A</option>
      </select>
    </div>
  );
}

export default Filter;
