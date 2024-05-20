import React from "react";
import "./pagination.css";

const Custompaggin = ({ totalPages, currentPage, handlePaginationClick }) => {
  return (
    <ul className="pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li
          key={page}
          onClick={() => handlePaginationClick(page)}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Custompaggin;
