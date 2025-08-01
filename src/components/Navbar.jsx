import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-[var(--ctp-surface0)] text-[var(--ctp-text)] shadow-md sticky top-0 z-50 border rounded-2xl border-[var(--ctp-peach)]">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-[var(--ctp-lavender)]">DAS KLIMA 🌎</h1>
                <ul className="flex space-x-6 text-sm font-medium">
                    <li><Link to="/blogoverview" className="hover:text-[var(--ctp-mauve)]">Blog</Link></li>
                    <li><Link to="/usermanagement" className="hover:text-[var(--ctp-mauve)]">Usermanagement</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;