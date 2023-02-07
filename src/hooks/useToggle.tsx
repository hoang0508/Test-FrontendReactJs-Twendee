import { useState } from "react";
export default function useToggle() {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return {
    toggle,
    handleToggle,
  };
}
