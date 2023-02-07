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

  const [h, setH] = useState<any>([]);

  useEffect(() => {
    setH(currentUsers);
  }, [currentUsers]);

  // if (currentUsers && currentUsers.length > 0) {
  //   console.log([...currentUsers]);
  //   h = [...currentUsers]?.sort((a: any, b: any) => {
  //     console.log(
  //       a.login.username.localeCompare(b.login.username) &&
  //         a.name.first.localeCompare(b.name.first)
  //     );
  //     return a.login.username.localeCompare(b.login.username);
  //   });
  // }

  // const test =
  //   currentUsers &&
  //   currentUsers.length > 0 &&
  //   currentUsers?.sort((a: any, b: any) =>
  //     a.login.username.localeCompare(b.login.username)
  //   );
  // console.log(test);

  // const h: any = [...currentPage];
  // console.log("🚀 ~ file: UserTable.tsx:34 ~ UserTable ~ h", h);

  const handleSortUserName = () => {
    if (currentUsers && currentUsers.length > 0) {
      console.log([...currentUsers]);
      setH(
        [...currentUsers]?.sort((a: any, b: any) => {
          return a.login.username.localeCompare(b.login.username);
        })
      );
    }
  };

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
              {h &&
                h.length > 0 &&
                h.map((user: ItemData) => (
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
