import React from "react";
import AppBar from "./AppBar";
import { HStack } from "@chakra-ui/react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AppBar toggleSidebar={toggleSidebar} />
      <HStack position="relative" align="flex-start">
        <SideBar isOpen={isSidebarOpen} />
        <main style={{ flex: 1, transition: "margin-left 0.3s", marginTop: "64px", padding: "10px" }} id="content">
          <Outlet />
        </main>
      </HStack>
    </>
  );
};

export default Layout;
