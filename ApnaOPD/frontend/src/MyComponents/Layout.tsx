import { Outlet } from "react-router-dom";
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Fixed Navbar */}
      <nav style={{ height: "60px", flexShrink: 0, background: "white", zIndex: 1000 }}>
        <NavBar />
      </nav>

      {/* Page Content fills remaining space */}
      <div style={{ flex: 1, marginTop: "0px", minHeight: 0, backgroundColor: "#f5f9fc" }}>
        <Outlet />
      </div>
    </div>
  );


}


