import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchDataUser, setCurrentPage } from "../redux/usersSlice";
import Pagination from "./Pagination";

const UserTable = () => {
  const usersPerPage = 10;
  // dispatch redux
  const dispatch = useDispatch();
  const { users, currentPage } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(
      fetchDataUser({
        currentPage,
        numberPerPage: usersPerPage,
      })
    );
  }, [currentPage, dispatch, usersPerPage]);

  // Change page
  const handlePaginate = (pageNumber: number) =>
    dispatch(setCurrentPage(pageNumber));

  // Get current users
  const currentUsers = users?.results;
  console.log(
    "🚀 ~ file: UserTable.js:26 ~ UserTable ~ currentUsers",
    currentUsers
  );

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>FullName</th>
              <th>Username</th>
              <th>Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers &&
              currentUsers.length > 0 &&
              currentUsers.map((user: any) => (
                <tr>
                  <td>Laughing Bacchus Winecellars</td>
                  <td>Yoshi Tannamuri</td>
                  <td>
                    <img src={user?.picture?.thumbnail} alt="" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          usersPerPage={usersPerPage}
          handlePaginate={handlePaginate}
        />
      </div>
    </>
  );
};

export default UserTable;
