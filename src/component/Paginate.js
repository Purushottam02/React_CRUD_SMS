import React from "react";
import "./style/Paginate.scss";

const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  handleChangeRowsPerPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              href="#"
              className="page-link"
              onClick={() => paginate(number)}
              onChange={handleChangeRowsPerPage}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
