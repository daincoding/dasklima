import { useEffect, useState } from "react";

const CommentSection = ({ postId = "demo-post" }) => {
    const [kommentare, setKommentare] = useState([]);
    const [form, setForm] = useState({ name: "", text: "" });

    useEffect(() => {
        const gespeichert = JSON.parse(localStorage.getItem("comments")) || {};
        setKommentare(gespeichert[postId] || []);
    }, [postId]);

    const verarbeiteAenderung = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const verarbeiteAbsenden = (e) => {
        e.preventDefault();
        const newComment = {
            name: form.name,
            text: form.text,
            date: new Date().toLocaleString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        const stored = JSON.parse(localStorage.getItem("comments")) || {};
        const updated = {
            ...stored,
            [postId]: [...(stored[postId] || []), newComment],
        };
        localStorage.setItem("comments", JSON.stringify(updated));
        setKommentare(updated[postId]);
        setForm({ name: "", text: "" });
    };

    return (
        <div className="mt-10 max-w-2xl mx-auto bg-[var(--cl-surface0)] text-[var(--cl-text)] p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[var(--cl-green)]">
                Kommentare
            </h3>

            {/* Kommentare anzeigen */}
            {kommentare.length === 0 ? (
                <p className="text-[var(--cl-subtext0)] italic mb-4">
                    Noch keine Kommentare.
                </p>
            ) : (
                <ul className="space-y-3 mb-6">
                    {kommentare.map((c, i) => (
                        <li
                            key={i}
                            className="bg-[var(--cl-surface1)] p-4 rounded-md border border-[var(--cl-surface2)]"
                        >
                            <div className="flex justify-between text-sm font-semibold">
                                <span>{c.name}</span>
                                <span className="text-xs text-[var(--cl-subtext1)]">
                                {c.date}
                                </span>
                            </div>
                            <p className="mt-2 text-[var(--cl-subtext0)]">{c.text}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Kommentarformular */}
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
                    focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)] transition"
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
                <button
                    type="submit"
                    className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold hover:opacity-90 transition"
                >
                    Absenden
                </button>
            </form>
        </div>
    );
};

export default CommentSection;