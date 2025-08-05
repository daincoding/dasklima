import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext.jsx';
import AuthModal from './AuthModal.jsx';
import { FiMenu, FiX } from "react-icons/fi";
import {AnimatePresence, motion} from "framer-motion";

function Navbar() {
    const { rolle, setRolle } = useRole();
    const [authModal, setAuthModal] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-[var(--cl-surface0)] text-[var(--cl-text)] sticky top-0 z-50 border border-[var(--cl-teal)] rounded-2xl shadow-[0_0_12px_2px_var(--cl-teal)]"
        >
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
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setAuthModal('login')}
                                className="px-2 py-1 text-sm rounded bg-[var(--cl-success)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                            >
                                🔐 Login
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setAuthModal('register')}
                                className="px-2 py-1 text-sm rounded bg-[var(--cl-warning)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                            >
                                🔑 Register
                            </motion.button>
                        </>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            onClick={() => setRolle('besucher')}
                            className="px-2 py-1 text-sm rounded bg-[var(--cl-error)] text-[var(--cl-text)] hover:opacity-80 transition"
                        >
                            🚪Logout
                        </motion.button>
                    )}
                </div>

                {/* Logo */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2"
                    whileHover={{ scale: 1.05 }}
                >
                    <Link
                        to="/"
                        className="text-base font-bold text-[var(--cl-green)] tracking-wide hover:text-[var(--cl-blue)] transition-colors"
                    >
                        D.A.S. Klima(Blog) 🌎
                    </Link>
                </motion.div>

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

                {/* Mobile: Burger Icon */}
                <button onClick={toggleMenu} className="md:hidden text-[var(--cl-text)]">
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menü */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 w-full bg-[var(--cl-surface0)] border-t border-[var(--cl-surface2)] shadow-md md:hidden px-4 py-4 space-y-3"
                    >
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                            className="flex flex-col space-y-2 text-sm font-medium"
                        >
                            <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                <Link to="/blogoverview" onClick={() => setMenuOpen(false)}>Blog</Link>
                            </motion.li>
                            {rolle === "admin" && (
                                <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                    <Link to="/newentry" onClick={() => setMenuOpen(false)}>Neuer Eintrag</Link>
                                </motion.li>
                            )}
                            {rolle === "admin" && (
                                <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                    <Link to="/usermanagement" onClick={() => setMenuOpen(false)}>Usermanagement</Link>
                                </motion.li>
                            )}
                        </motion.ul>

                        {/* Mobile Rollenauswahl */}
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
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.03 }}
                                        onClick={() => {
                                            setAuthModal('login');
                                            setMenuOpen(false);
                                        }}
                                        className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-success)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                                    >
                                        🔐 Login
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.03 }}
                                        onClick={() => {
                                            setAuthModal('register');
                                            setMenuOpen(false);
                                        }}
                                        className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-warning)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                                    >
                                        🔑 Register
                                    </motion.button>
                                </>
                            ) : (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => {
                                        setRolle('besucher');
                                        setMenuOpen(false);
                                    }}
                                    className="w-full px-2 py-1 text-sm rounded bg-[var(--cl-error)] text-[var(--cl-text)] hover:opacity-80 transition"
                                >
                                    🚪 Logout
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth Modal bleibt unverändert */}
            {authModal && (
                <AuthModal
                    type={authModal}
                    onClose={() => setAuthModal(null)}
                />
            )}
        </motion.nav>
    );
}

export default Navbar;