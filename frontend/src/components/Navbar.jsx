import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import logo from "../assets/images/pakka_logo.png";
import "../assets/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Complaints", path: "/complaints" },
    { label: "Complaint Task", path: "/complaint-task" },
    { label: "Workflow", path: "/workflows" },
];

    return (
        <header className="topbar">

            {/* Left: Logo */}
            <div className="topbar-left">
                <img src={logo} alt="Pakka Logo" className="company-logo" />
            </div>

            {/* Center: Nav Links */}
            <nav className="topbar-nav">
                {navLinks.map((link) => (
                    <Link
                        key={link.label}
                        to={link.path}
                        className={
                            "topbar-nav-link" +
                            (location.pathname === link.path ? " active" : "")
                        }
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Right: Notification + Profile only */}
            <div className="topbar-right">

                <button className="topbar-icon-btn" title="Notifications">
                    <FaBell />
                    <span className="notif-badge">0</span>
                </button>

                <div className="profile-wrapper" ref={profileRef}>
                    <button
                        className="topbar-icon-btn"
                        title="Profile"
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                    >
                        <FaUserCircle />
                    </button>

                    {showProfileMenu && (
                        <div className="profile-dropdown">

                            <div className="profile-dropdown-header">
                                <div className="profile-avatar-placeholder">
                                    <span>TP</span>
                                </div>
                                <div className="profile-info">
                                    <div className="profile-name">Team Pakka</div>
                                    <div className="profile-role">admin</div>
                                    <div className="profile-title">IT Admin</div>
                                </div>
                            </div>

                            <div className="profile-dropdown-divider" />

                            <div className="profile-dropdown-actions">
                                <button
                                    className="profile-action-btn"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        navigate("/preferences");
                                    }}
                                >
                                    <FaCog /> My Preferences
                                </button>
                                <button
                                    className="profile-action-btn"
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        navigate("/");
                                    }}
                                >
                                    <FaSignOutAlt /> Sign Out
                                </button>
                            </div>

                        </div>
                    )}
                </div>

            </div>

        </header>
    );
}

export default Navbar;