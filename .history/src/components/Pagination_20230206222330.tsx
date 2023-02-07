import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { TotalUser } from "../utils/enum";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { setCurrentPage } from "../redux/usersSlice";

interface PropsPagination {
  usersPerPage: number;
  handlePaginate: (itemNunber: number) => void;
}

const Pagination = ({ usersPerPage, handlePaginate }: PropsPagination) => {
  const dispatch = useDispatch();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(TotalUser.TOTAL_USER / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const { currentPage } = useSelector((state: RootState) => state.users);
  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < TotalUser.USER_PERPAGE)
      dispatch(setCurrentPage(currentPage + 1));
  };

  return (
    <nav>
      <ul className="pagination">
        <button
          className="pagination-prev"
          disabled={currentPage <= 1}
          onClick={() => handlePrev()}
        >
          <GrFormPrevious />
        </button>
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
        <button
          className="pagination-next"
          onClick={() => handleNext()}
          disabled={currentPage < TotalUser.USER_PERPAGE}
        >
          <GrFormNext />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
