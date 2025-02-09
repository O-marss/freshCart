import React from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import Overlay from "../Overlay/Overlay.jsx";
import useOverlay from "../../Hooks/useOverlay.jsx";

export default function Layout() {

  const { isOpen, hideOverlay, showOverlay } = useOverlay();

  return (
    <>
      <Navbar hideOverlay={hideOverlay} showOverlay={showOverlay} />
      <main>
        <Outlet context={{ hideOverlay, showOverlay }}></Outlet>

      </main>
      <Overlay isOpen={isOpen} />
      <Footer />
    </>
  );
}
