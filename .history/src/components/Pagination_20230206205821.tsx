import { useSelector } from "react-redux";
import { TOTAL_USER } from "../utils/TotalUser";

interface PropsPagination {
  usersPerPage: number;
  handlePaginate: () => void;
}

const Pagination = ({ usersPerPage, handlePaginate }: PropsPagination) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TOTAL_USER / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const { currentPage } = useSelector((state) => state.users);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              currentPage === number ? "active-page" : ""
            }`}
          >
            <button
              onClick={() => handlePaginate(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
