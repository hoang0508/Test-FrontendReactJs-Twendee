import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchDataUser, setCurrentPage } from "../redux/usersSlice";
import { ItemData } from "../utils/type";
import Pagination from "./Pagination";
import { v4 } from "uuid";
import "./UserTable.scss";

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
    "🚀 ~ file: UserTable.tsx:28 ~ UserTable ~ currentUsers",
    currentUsers
  );

  return (
    <>
      <div className="userTable">
        <table className="userTable-table">
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
              currentUsers.map((user: ItemData) => (
                <tr key={v4()}>
                  <td>
                    <span>{user?.name?.title}</span>
                    <span>{user?.name?.first}</span>
                    <span>{user?.name?.last}</span>
                  </td>
                  <td>{user?.login?.username}</td>
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
