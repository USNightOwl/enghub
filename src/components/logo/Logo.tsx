import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <Heading as="h5" size="md" textTransform="uppercase">
        English Hub
      </Heading>
    </Link>
  );
};

export default Logo;
