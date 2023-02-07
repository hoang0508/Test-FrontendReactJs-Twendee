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
  const { currentPage, users } = useSelector((state: RootState) => state.users);
  console.log("🚀 ~ file: Pagination.tsx:19 ~ Pagination ~ users", users);

  const handlePrev = () => {
    if (currentPage > 1)
      dispatch(setCurrentPage((currentPage: number) => currentPage - 1));
  };

  const handleNext = () => {
    // if(users && users.length )
    dispatch(setCurrentPage((currentPage: number) => currentPage + 1));
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
          // disabled={}
        >
          <GrFormNext />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
