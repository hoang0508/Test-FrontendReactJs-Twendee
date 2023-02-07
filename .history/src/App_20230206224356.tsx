import UserTable from "./components/UserTable";
import { useSelector } from "react-redux";
function App() {
  const { isLoading } = useSelector((state: any) => state.users);
  return (
    <div className={isLoading ? "loading" : ""}>
      <UserTable />
    </div>
  );
}

export default App;
