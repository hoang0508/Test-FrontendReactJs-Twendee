import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TotalUser } from "../utils/enum";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
interface PropsPagination {
  usersPerPage: number;
  handlePaginate: (itemNunber: number) => void;
}

const Pagination = ({ usersPerPage, handlePaginate }: PropsPagination) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalUser.TOTAL_USER / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const { currentPage } = useSelector((state: RootState) => state.users);

  return (
    <nav>
      <ul className="pagination">
        <span>
          <GrFormPrevious />
        </span>
        {pageNumbers.map((itemNumber: number) => (
          <li
            key={itemNumber}
            className={`page-item ${
              currentPage === itemNumber ? "active-page" : ""
            }`}
          >
            <button
              onClick={() => handlePaginate(itemNumber)}
              className="page-link"
            >
              {itemNumber}
            </button>
          </li>
        ))}
        <span>
          <GrFormNext />
        </span>
      </ul>
    </nav>
  );
};

export default Pagination;
