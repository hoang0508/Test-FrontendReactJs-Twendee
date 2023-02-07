import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { fetchDataUser, setCurrentPage } from "../redux/usersSlice";
import { ItemData } from "../utils/type";
import Pagination from "./Pagination";
import { v4 } from "uuid";
import "./UserTable.scss";
import { TotalUser } from "../utils/enum";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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

  const currentUsers = users?.results;
  const [dataSortUser, setDataSortUser] = useState<any>([]);
  const [toggleSort, setToggleSort] = useState<boolean>(false);

  useEffect(() => {
    setDataSortUser(currentUsers);
  }, [currentUsers]);

  // Sort User Name
  const handleSortUserName = () => {
    setToggleSort(!toggleSort);
  };

  useEffect(() => {
    if (currentUsers && currentUsers.length > 0) {
      if (toggleSort) {
        setDataSortUser(
          [...currentUsers]?.sort((a: any, b: any) => {
            return a.login.username.localeCompare(b.login.username);
          })
        );
      } else {
        setDataSortUser(
          [...currentUsers]?.sort((a: any, b: any) => {
            return b.login.username.localeCompare(a.login.username);
          })
        );
      }
    }
  }, [toggleSort, currentUsers]);

  // Sort FullName

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
                <th>
                  FullName{" "}
                  <span>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                </th>
                <th>
                  Usernames{" "}
                  <span onClick={() => handleSortUserName()}>
                    <MdOutlineKeyboardArrowDown />
                  </span>
                </th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {dataSortUser &&
                dataSortUser.length > 0 &&
                dataSortUser.map((user: ItemData) => (
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
