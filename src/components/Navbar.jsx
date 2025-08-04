import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext.jsx';
import AuthModal from './AuthModal.jsx';

function Navbar() {
    const { rolle, setRolle } = useRole();
    const [authModal, setAuthModal] = useState(null);

    return (
        <nav className="w-full bg-[var(--cl-surface0)] text-[var(--cl-text)] sticky top-0 z-50 border border-[var(--cl-teal)] rounded-2xl shadow-[0_0_12px_2px_var(--cl-teal)]">
            <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between relative">

                {/* Linker Bereich: Rolle + Auth */}
                <div className="flex items-center gap-3">
                    {/* Rollenauswahl */}
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

                {/* Mittig zentriertes Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link
                        to="/"
                        className="text-base font-bold text-[var(--cl-green)] tracking-wide hover:text-[var(--cl-blue)] transition-colors"
                    >
                        D.A.S. KLIMA 🌎
                    </Link>
                </div>

                {/* Rechter Bereich: Navigation */}
                <ul className="flex space-x-4 text-sm font-medium">
                    <li>
                        <Link to="/blogoverview" className="hover:text-[var(--cl-blue)] transition-colors">
                            Blog
                        </Link>
                    </li>
                    {rolle === "admin" && (
                    <li>
                        <Link to="/newentry" className="hover:text-[var(--cl-blue)] transition-colors">
                            Neuer Eintrag
                        </Link>
                    </li>
                    )}
                    {rolle === "admin" && (
                        <li>
                            <Link to="/usermanagement" className="hover:text-[var(--cl-blue)] transition-colors">
                                Usermanagement
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
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