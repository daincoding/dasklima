import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            className="w-full bg-[var(--cl-surface0)] text-[var(--cl-text)] sticky top-0 z-50
      border border-[var(--cl-teal)] rounded-2xl shadow-[0_0_12px_2px_var(--cl-teal)]"
        >
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-[var(--cl-green)] tracking-wide">
                    DAS KLIMA 🌎
                </h1>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-sm font-medium">
                    <li>
                        <Link
                            to="/blogoverview"
                            className="hover:text-[var(--cl-blue)] transition-colors"
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/usermanagement"
                            className="hover:text-[var(--cl-blue)] transition-colors"
                        >
                            Usermanagement
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;