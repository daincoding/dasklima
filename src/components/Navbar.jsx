import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext.jsx';
import AuthModal from './AuthModal.jsx';
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

function Navbar() {
    const { rolle, setRolle } = useRole();
    const [authModal, setAuthModal] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="w-full bg-[var(--cl-surface0)] text-[var(--cl-text)] sticky top-0 z-50 border border-[var(--cl-teal)] rounded-2xl shadow-[0_0_12px_2px_var(--cl-teal)]">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between relative">

                {/* Links: Rollenwahl & Auth */}
                <div className="hidden md:flex items-center gap-3">
                    <select
                        value={rolle}
                        onChange={(e) => setRolle(e.target.value)}
                        className="rounded px-2 py-1 text-sm bg-[var(--cl-surface1)] text-[var(--cl-text)] border border-[var(--cl-teal)]"
                    >
                        <option value="besucher">Besucher</option>
                        <option value="benutzer">Benutzer</option>
                        <option value="admin">Admin</option>
                    </select>
                    {rolle === 'besucher' ? (
                        <>
                            <button
                                onClick={() => setAuthModal('login')}
                                className="px-2 py-1 text-sm rounded bg-[var(--cl-success)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                            >
                                🔐 Login
                            </button>
                            <button
                                onClick={() => setAuthModal('register')}
                                className="px-2 py-1 text-sm rounded bg-[var(--cl-warning)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                            >
                                🔑 Register
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setRolle('besucher')}
                            className="px-2 py-1 text-sm rounded bg-[var(--cl-error)] text-[var(--cl-text)] hover:opacity-80 transition"
                        >
                            🚪Logout
                        </button>
                    )}
                </div>

                {/* Mittig: Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link
                        to="/"
                        className="text-base font-bold text-[var(--cl-green)] tracking-wide hover:text-[var(--cl-blue)] transition-colors"
                    >
                        D.A.S. Klima(Blog) 🌎
                    </Link>
                </div>

                {/* Rechts: Desktop-Menü */}
                <ul className="hidden md:flex space-x-4 text-sm font-medium">
                    <li><Link to="/blogoverview" className="hover:text-[var(--cl-blue)]">Blog</Link></li>
                    {rolle === "admin" && (
                        <li><Link to="/newentry" className="hover:text-[var(--cl-blue)]">Neuer Eintrag</Link></li>
                    )}
                    {rolle === "admin" && (
                        <li><Link to="/usermanagement" className="hover:text-[var(--cl-blue)]">Usermanagement</Link></li>
                    )}
                </ul>

                {/* Mobile: Hamburger Icon */}
                <button onClick={toggleMenu} className="md:hidden text-[var(--cl-text)]">
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menü */}
            {menuOpen && (
                <motion.div
                    // Framer Motion animation
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 w-full bg-[var(--cl-surface0)] border-t border-[var(--cl-surface2)] shadow-md md:hidden px-4 py-4 space-y-3"
                >
                    <ul className="flex flex-col space-y-2 text-sm font-medium">
                        <li>
                            <Link to="/blogoverview" onClick={() => setMenuOpen(false)}>Blog</Link>
                        </li>
                        {rolle === "admin" && (
                            <li>
                                <Link to="/newentry" onClick={() => setMenuOpen(false)}>Neuer Eintrag</Link>
                            </li>
                        )}
                        {rolle === "admin" && (
                            <li>
                                <Link to="/usermanagement" onClick={() => setMenuOpen(false)}>Usermanagement</Link>
                            </li>
                        )}
                    </ul>

                    {/* 👇 Rollenauswahl & Auth (nur mobil sichtbar) */}
                    <div className="mt-4 flex flex-col gap-2">
                        <select
                            value={rolle}
                            onChange={(e) => setRolle(e.target.value)}
                            className="rounded px-2 py-1 text-sm bg-[var(--cl-surface1)] text-[var(--cl-text)] border border-[var(--cl-teal)]"
                        >
                            <option value="besucher">Besucher</option>
                            <option value="benutzer">Benutzer</option>
                            <option value="admin">Admin</option>
                        </select>

                        {rolle === 'besucher' ? (
                            <>
                                <button
                                    onClick={() => {
                                        setAuthModal('login');
                                        setMenuOpen(false);
                                    }}
                                    className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-success)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                                >
                                    🔐 Login
                                </button>
                                <button
                                    onClick={() => {
                                        setAuthModal('register');
                                        setMenuOpen(false);
                                    }}
                                    className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-warning)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                                >
                                    🔑 Register
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    setRolle('besucher');
                                    setMenuOpen(false);
                                }}
                                className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-error)] text-[var(--cl-text)] hover:opacity-80 transition"
                            >
                                🚪 Logout
                            </button>
                        )}
                    </div>
                </motion.div>
            )}

            {authModal && (
                <AuthModal
                    type={authModal}
                    onClose={() => setAuthModal(null)}
                />
            )}
        </nav>
    );
}

export default Navbar;