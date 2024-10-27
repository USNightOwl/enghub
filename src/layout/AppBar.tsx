import Logo from "@/components/logo/Logo";
import { Button, HStack, Text, useMediaQuery } from "@chakra-ui/react";
import { Menu } from "lucide-react";

type Props = {
  toggleSidebar: () => void;
};

const AppBar = ({ toggleSidebar }: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 680px)");
  return (
    <HStack
      className="bg-sky-800 text-white border-b p-3 fixed top-0 left-0 w-full shadow-2xl z-50"
      align="center"
      justify="space-between"
    >
      <HStack spacing="10px">
        <Button
          size="md"
          backgroundColor="transparent"
          _hover={{ bg: "rgba(0, 0, 0, 0.08)" }}
          onClick={toggleSidebar}
          hidden={isMobile}
        >
          <Menu className="text-white" />
        </Button>
        <Logo />
      </HStack>
      <HStack spacing="20px">
        <Text fontSize="lg">Login</Text>
        <Text fontSize="lg">Register</Text>
      </HStack>
    </HStack>
  );
};

export default AppBar;
