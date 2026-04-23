import { NavLink } from "react-router-dom";
import "../../assets/css/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="sidebar-overlay" onClick={onClose}></div>
            )}

            <div className={`sidebar ${isOpen ? "open" : ""}`}>

                {/* LOGO */}
                <h2 className="logo">Taskflow</h2>

                {/* MENU */}
                <div className="sidebar-menu">

                    <NavLink to="/dashboard" className="menu-item">
                        <span>📊</span> Dashboard
                    </NavLink>

                    <NavLink to="/tasks" className="menu-item">
                        <span>📝</span> Tasks
                    </NavLink>

                    <NavLink to="/projects" className="menu-item">
                        <span>📁</span> Projects
                    </NavLink>

                </div>

                {/* FOOTER */}
                <div className="sidebar-footer">
                    <div className="menu-item">
                        <span>⚙️</span> Settings
                    </div>
                </div>

            </div>
        </>
    );
};

export default Sidebar;