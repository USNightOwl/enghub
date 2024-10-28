import { Button, List, ListItem, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { ClipboardCheck, Home, ScanSearch, SpellCheck, Tag } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
};

class MenuOption {
  name: string;
  icon: React.ReactElement;
  onClick: () => void;

  constructor({ name, icon, onClick }: { name: string; icon: React.ReactElement; onClick: () => void }) {
    this.name = name;
    this.icon = icon;
    this.onClick = onClick;
  }
}

const SideBar = ({ isOpen }: Props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const location = useLocation();
  const [isMobile] = useMediaQuery("(max-width: 680px)");
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  React.useEffect(() => {
    switch (location.pathname) {
      case "/dictionary":
        setSelectedIndex(0);
        document.title = "Dictionary";
        break;
      case "/learn-through-images":
        setSelectedIndex(1);
        document.title = "Learn Through Images";
        break;
      case "/check-grammar":
        setSelectedIndex(2);
        document.title = "Check Grammar";
        break;
      case "/check-spelling":
        setSelectedIndex(3);
        document.title = "Check Spelling";
        break;
      case "/learn-flashcard":
        setSelectedIndex(4);
        document.title = "Flash Card";
        break;
      case "/about":
        setSelectedIndex(5);
        document.title = "About";
        break;
      default:
        setSelectedIndex(-1);
        break;
    }
  }, [location]);

  const menuOptions: MenuOption[] = [
    new MenuOption({
      name: "Dictionary",
      icon: <Home />,
      onClick: () => {
        navigate("/dictionary");
      },
    }),
    new MenuOption({
      name: "Learn Through Images",
      icon: <ScanSearch />,
      onClick: () => {
        navigate("/learn-through-images");
      },
    }),
    new MenuOption({
      name: "Check Grammar",
      icon: <ClipboardCheck />,
      onClick: () => {
        navigate("/check-grammar");
      },
    }),
    new MenuOption({
      name: "Check Spelling",
      icon: <SpellCheck />,
      onClick: () => {
        navigate("/check-spelling");
      },
    }),
    new MenuOption({
      name: "Flash Card",
      icon: <Tag />,
      onClick: () => {
        navigate("/learn-flashcard");
      },
    }),
  ];

  return (
    <VStack
      position="sticky"
      minW={(isOpen || isHovered) && !isMobile ? "260px" : "60px"}
      maxW={(isOpen || isHovered) && !isMobile ? "260px" : "60px"}
      height="100dvh"
      borderRight="1px"
      align="flex-start"
      overflowY="auto"
      overscrollBehavior="contain"
      borderColor="#d4d4d4"
      className="top-0"
      transition="width 0.2s, padding 0.3s"
      paddingTop="64px"
    >
      <List onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} width="full" marginY="8px">
        {menuOptions.map((menu, idx) => (
          <ListItem key={menu.name}>
            <Button
              width="full"
              leftIcon={menu.icon}
              borderRadius="0"
              justifyContent="flex-start"
              gap="10px"
              paddingY="6"
              _hover={{ bg: idx === selectedIndex ? "rgb(221, 242, 253)" : "rgba(0, 0, 0, 0.04)" }}
              bg={idx === selectedIndex ? "rgb(221, 242, 253)" : "transparent"}
              onClick={menu.onClick}
            >
              {(isOpen || isHovered) && !isMobile && <Text fontSize="lg">{menu.name}</Text>}
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default SideBar;
