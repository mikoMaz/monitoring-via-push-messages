import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Image
        src="/img/logo192.png"
        boxSize="50px"
        alt="Logo"
        onClick={() => navigate("/")}
        style={{cursor: "pointer"}}
      />
  );
};
