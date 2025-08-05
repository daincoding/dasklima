import React, { useState } from "react";
import { fakeUsers } from "../data/fakeUsers.js";
import { useRole } from "../context/RoleContext.jsx";

const AuthModal = ({ type, onClose }) => {
    const isLogin = type === "login";
    const { setRolle, setNutzername } = useRole();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            const user = fakeUsers.find(
                (u) => u.name === form.name && u.password === form.password
            );

            if (user) {
                setRolle(user.rolle);
                setNutzername(user.name);
                onClose();
            } else {
                setError("❌ Benutzername oder Passwort falsch");
            }
        } else {
            // Registrierung deaktiviert – du könntest hier ein anderes Verhalten einbauen
            setError("❌ Registrierung aktuell nicht möglich");
        }
    };

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

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                        required
                    />
                    {!isLogin && (
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Mail"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Passwort"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[var(--cl-surface1)] border border-[var(--cl-teal)] text-[var(--cl-text)]"
                        required
                    />

                    {error && <p className="text-[var(--cl-red)] text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 rounded bg-[var(--cl-green)] text-[var(--cl-text-dark)] font-semibold hover:opacity-90"
                    >
                        {isLogin ? "Einloggen" : "Registrieren"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;