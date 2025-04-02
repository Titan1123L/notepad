import React from "react";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="mt-7 flex items-center justify-center gap-3">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`border border-black p-1 rounded-md ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-black hover:text-white transition"
        }`}
      >
        <HiArrowSmLeft size={20} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`border border-black p-1 rounded-md ${
            currentPage === page
              ? "bg-black text-white"
              : "hover:bg-black hover:text-white transition"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`border border-black p-1 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-black hover:text-white transition"
        }`}
      >
        <HiArrowSmRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;
