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

  const handdlePrev = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <nav>
      <ul className="pagination">
        <span className="pagination-prev" onClick={() => handlePrev()}>
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
        <span className="pagination-next">
          <GrFormNext />
        </span>
      </ul>
    </nav>
  );
};

export default Pagination;
