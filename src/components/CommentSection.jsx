import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext.jsx";

const CommentSection = ({ postId = "demo-post" }) => {
    const [kommentare, setKommentare] = useState([]);
    const [form, setForm] = useState({ name: "", text: "" });
    const [editId, setEditId] = useState(null);

    const { rolle, nutzername, setNutzername } = useRole();

    // Kommentare aus localStorage laden
    useEffect(() => {
        const gespeichert = JSON.parse(localStorage.getItem("comments")) || {};
        setKommentare(gespeichert[postId] || []);
    }, [postId]);

    // Eingabefelder aktualisieren
    const verarbeiteAenderung = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Kommentar abschicken oder bearbeiten
    const verarbeiteAbsenden = (e) => {
        e.preventDefault();
        const gespeichert = JSON.parse(localStorage.getItem("comments")) || {};
        if (!nutzername) setNutzername(form.name); // Erstes Mal Name übernehmen

        if (editId) {
            const aktualisiert = (gespeichert[postId] || []).map((k) =>
                k.id === editId ? { ...k, text: form.text } : k
            );
            gespeichert[postId] = aktualisiert;
            localStorage.setItem("comments", JSON.stringify(gespeichert));
            setKommentare(aktualisiert);
            setEditId(null);
        } else {
            const neuerKommentar = {
                id: Date.now(),
                name: form.name,
                text: form.text,
                date: new Date().toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                author: rolle,
            };

            const updated = {
                ...gespeichert,
                [postId]: [...(gespeichert[postId] || []), neuerKommentar],
            };
            localStorage.setItem("comments", JSON.stringify(updated));
            setKommentare(updated[postId]);
        }

        setForm({ name: "", text: "" });
    };

    const kommentarBearbeiten = (id) => {
        const ziel = kommentare.find((k) => k.id === id);
        setForm({ name: ziel.name, text: ziel.text });
        setEditId(id);
    };

    const kommentarLoeschen = (id) => {
        const gespeichert = JSON.parse(localStorage.getItem("comments")) || {};
        const gefiltert = (gespeichert[postId] || []).filter((k) => k.id !== id);
        gespeichert[postId] = gefiltert;
        localStorage.setItem("comments", JSON.stringify(gespeichert));
        setKommentare(gefiltert);
    };

    return (
        <div className="mt-10 max-w-2xl mx-auto bg-[var(--cl-surface0)] text-[var(--cl-text)] p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[var(--cl-green)]">Kommentare</h3>

            {kommentare.length === 0 ? (
                <p className="text-[var(--cl-subtext0)] italic mb-4">
                    Noch keine Kommentare.
                </p>
            ) : (
                <ul className="space-y-3 mb-6">
                    {kommentare.map((c) => {
                        const istAutor = rolle !== "besucher" &&
                            c.name === nutzername &&
                            c.author === rolle;
                        const istAdmin = rolle === "admin";

                        return (
                            <li
                                key={c.id}
                                className="bg-[var(--cl-surface1)] p-4 rounded-md border border-[var(--cl-surface2)]"
                            >
                                <div className="flex justify-between text-sm font-semibold">
                                    <span>{c.name}</span>
                                    <span className="text-xs text-[var(--cl-subtext1)]">{c.date}</span>
                                </div>
                                <p className="mt-2 text-[var(--cl-subtext0)]">{c.text}</p>

                                {(istAutor || istAdmin) && (
                                    <div className="flex gap-2 mt-2">
                                        {istAutor && (
                                            <button
                                                onClick={() => kommentarBearbeiten(c.id)}
                                                className="text-sm text-[var(--cl-green)] hover:underline"
                                            >
                                                ✏️ Bearbeiten
                                            </button>
                                        )}
                                        {istAdmin && (
                                            <button
                                                onClick={() => kommentarLoeschen(c.id)}
                                                className="text-sm text-[var(--cl-red)] hover:underline"
                                            >
                                                🗑️ Löschen
                                            </button>
                                        )}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* Formular nur für Benutzer & Admin */}
            {rolle !== "besucher" && (
                <form onSubmit={verarbeiteAbsenden} className="space-y-3">
                    <input
                        name="name"
                        value={form.name}
                        onChange={verarbeiteAenderung}
                        placeholder="Dein Name"
                        required
                        className="w-full p-3 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text)]
                        placeholder:text-[var(--cl-subtext1)]
                        border border-[var(--cl-teal)]
                        shadow-[0_0_6px_1px_var(--cl-teal)]
                        focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition
                        ${nutzername ? 'opacity-60 cursor-not-allowed' : ''}`}"
                    />
                    <textarea
                        name="text"
                        value={form.text}
                        onChange={verarbeiteAenderung}
                        placeholder="Dein Kommentar"
                        required
                        className="w-full p-3 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text)]
                        placeholder:text-[var(--cl-subtext1)]
                        border border-[var(--cl-teal)]
                        shadow-[0_0_6px_1px_var(--cl-teal)]
                        focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition"
                    />
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold hover:opacity-90 transition"
                        >
                            {editId ? "💾 Speichern" : "Absenden"}
                        </button>
                        {editId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditId(null);
                                    setForm({ name: "", text: "" });
                                }}
                                className="text-sm text-[var(--cl-subtext1)] hover:underline"
                            >
                                ❌ Abbrechen
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
};

export default CommentSection;