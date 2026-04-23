import useAuth from "../../hooks/useAuth";
import "../../assets/css/Navbar.css";

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();

    return (
        <div className="navbar">

            {/* LEFT */}
            <div className="nav-left">
                {/* MOBILE MENU */}
                <button
                    className="menu-btn"
                    onClick={onMenuClick}
                >
                    ☰
                </button>

                <h2>Dashboard</h2>
            </div>

            {/* RIGHT */}
            <div className="nav-right">

                {/* USER NAME */}
                <span className="user-name">
                    {user?.name || "User"}
                </span>

                {/* PROFILE */}
                <div className="profile" title={user?.name}>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                {/* LOGOUT */}
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Navbar;