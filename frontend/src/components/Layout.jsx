import Navbar from "./Navbar";
import "../assets/layout.css";

function Layout({ children }) {
  return (
    <div className="layout-container">

      {/* Header */}
      <Navbar />

      {/* Page Content */}
      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default Layout;
