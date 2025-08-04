// ✅ 1. AuthModal.jsx
import React from "react";

const AuthModal = ({ type, onClose }) => {
    const isLogin = type === "login";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-[var(--cl-surface0)] text-[var(--cl-text)] rounded-xl p-6 w-full max-w-md shadow-xl border border-[var(--cl-teal)] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-[var(--cl-subtext1)] hover:text-[var(--cl-red)]"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center text-[var(--cl-green)]">
                    {isLogin ? "🔐 Login" : "🔑 Registrierung"}
                </h2>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                    />
                    {!isLogin && (
                        <input
                            type="email"
                            placeholder="E-Mail"
                            className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Passwort"
                        className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                    />

                    <button
                        type="button"
                        className="w-full py-2 rounded bg-[var(--cl-green)] text-[var(--cl-text-dark)] font-semibold hover:opacity-90"
                        onClick={onClose} // Fake-Login schließt nur Modal
                    >
                        {isLogin ? "Einloggen" : "Registrieren"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;