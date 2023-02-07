import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser, setCurrentPage } from "../redux/usersSlice";
import { ItemData } from "../utils/type";
import Pagination from "./Pagination";
import { v4 } from "uuid";
import "./UserTable.scss";
import { TotalUser } from "../utils/enum";

const UserTable = () => {
  const usersPerPage = TotalUser.USER_PERPAGE;
  // dispatch redux
  const dispatch = useDispatch();
  const { users, currentPage, isLoading } = useSelector(
    (state: any) => state.users
  );

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

  const currentUsers = users;
  console.log(
    "🚀 ~ file: UserTable.tsx:32 ~ UserTable ~ currentUsers",
    currentUsers
  );

  // const h: any = [...currentPage];
  // console.log("🚀 ~ file: UserTable.tsx:34 ~ UserTable ~ h", h);

  return (
    <>
      {isLoading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
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
                      <span>{user?.name?.title}</span>{" "}
                      <span>{user?.name?.first}</span>{" "}
                      <span>{user?.name?.last}</span>{" "}
                    </td>
                    <td>{user?.login?.username}</td>
                    <td>
                      <div className="image-user">
                        <img src={user?.picture?.thumbnail} alt="" />
                      </div>
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
      )}
    </>
  );
};

export default UserTable;
