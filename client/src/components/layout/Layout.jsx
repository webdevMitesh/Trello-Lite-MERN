import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../assets/css/Layout.css";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout">

            {/* SIDEBAR */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="main">

                {/* NAVBAR */}
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                {/* CONTENT */}
                <div className="content">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Layout;