import { Link } from "react-router-dom";
import "../assets/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h3 className="sidebar-logo">
        Pakka
      </h3>

      <ul className="sidebar-menu">

        <li>
          <Link to="/dashboard"> Dashboard</Link>
        </li>

        <li>
          <Link to="/new-complaint"> New Complaint</Link>
        </li>


        <li>
          <Link to="/complaint-task"> Complaint Task</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;