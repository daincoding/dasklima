import { useEffect, useState } from "react";
import { useRole } from "../context/RoleContext.jsx";
import {AnimatePresence, motion} from 'framer-motion';

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
                name: nutzername || form.name, // immer Context-Name verwenden, falls vorhanden
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 max-w-2xl mx-auto bg-[var(--cl-surface0)] text-[var(--cl-text)] p-6 rounded-xl shadow-md"
        >
            <h3 className="text-2xl font-bold mb-4 text-[var(--cl-green)]">Kommentare</h3>

            {kommentare.length === 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--cl-subtext0)] italic mb-4"
                >
                    Noch keine Kommentare.
                </motion.p>
            ) : (

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
                    className="space-y-3 mb-6"
                >
                    <AnimatePresence>
                        {kommentare.map((c) => {
                            const istAutor = rolle !== "besucher" && c.name === nutzername && c.author === rolle;
                            const istAdmin = rolle === "admin";

                            return (
                                <motion.li
                                    key={c.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
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
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => kommentarBearbeiten(c.id)}
                                                    className="text-sm text-[var(--cl-green)] hover:underline"
                                                >
                                                    ✏️ Bearbeiten
                                                </motion.button>
                                            )}
                                            {istAdmin && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={() => kommentarLoeschen(c.id)}
                                                    className="text-sm text-[var(--cl-red)] hover:underline"
                                                >
                                                    🗑️ Löschen
                                                </motion.button>
                                            )}
                                        </div>
                                    )}
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </motion.ul>
            )}

            {/* Kommentar-Formular */}
            {rolle !== "besucher" && (
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={verarbeiteAbsenden}
                    className="space-y-3"
                >
                    {/* Nur anzeigen, wenn kein Nutzername im Kontext */}
                    {!nutzername && (
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
                    focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition"
                        />
                    )}

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
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold hover:opacity-90 transition"
                        >
                            {editId ? "💾 Speichern" : "Absenden"}
                        </motion.button>

                        {editId && (
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => {
                                    setEditId(null);
                                    setForm({ name: "", text: "" });
                                }}
                                className="text-sm text-[var(--cl-subtext1)] hover:underline"
                            >
                                ❌ Abbrechen
                            </motion.button>
                        )}
                    </div>
                </motion.form>
            )}
        </motion.div>
    );
};

export default CommentSection;