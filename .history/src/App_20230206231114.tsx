import UserTable from "./components/UserTable";
import { useSelector } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
function App() {
  const { isLoading } = useSelector((state: any) => state.users);
  return (
    <>
      <LoadingBar />
      <div className={isLoading ? "loading" : ""}>
        <UserTable />
      </div>
    </>
  );
}

export default App;
