import { useState, useEffect } from 'react';
import CommentSection from "../components/CommentSection.jsx";

function BlogUebersicht() {
    const [beitraege, setBeitraege] = useState([]);
    const [ausgewaehlt, setAusgewaehlt] = useState(null);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [ausgewaehlteKategorie, setAusgewaehlteKategorie] = useState('Alle');

    useEffect(() => {
        fetch('/data/blogeintrag.json')
            .then((antwort) => antwort.json())
            .then((daten) => setBeitraege(daten))
            .catch((fehler) => console.error('Fehler beim Laden der Daten:', fehler));
    }, []);

    const kategorien = ['Alle', ...new Set(beitraege.map(eintrag => eintrag.kategorie))];

    const gefilterteBeitraege = beitraege
        .filter(eintrag =>
            eintrag.titel.toLowerCase().includes(suchbegriff.toLowerCase()) &&
            (ausgewaehlteKategorie === 'Alle' || eintrag.kategorie === ausgewaehlteKategorie)
        )
        .sort((a, b) => new Date(a.datum) - new Date(b.datum)); // älteste zuerst

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto text-[var(--cl-text)]">

            {/* Linke Seite: Detailansicht */}
            <div className="w-full md:w-[70%] bg-[var(--cl-surface0)] p-6 rounded-xl shadow-md">
                {ausgewaehlt ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-[var(--cl-sky)]">{ausgewaehlt.titel}</h2>
                        <p className="text-sm text-[var(--cl-subtext1)] mb-2">
                            {ausgewaehlt.kategorie} • {new Date(ausgewaehlt.datum).toLocaleDateString()}
                        </p>
                        <p className="text-[var(--cl-subtext0)] mb-4">
                            <strong>{ausgewaehlt.kurzbeschreibung}</strong>
                        </p>
                        <p className="leading-relaxed whitespace-pre-line">{ausgewaehlt.text}</p>

                        {/* Kommentarbereich */}
                        <CommentSection postId={`blog-${ausgewaehlt.id}`} />
                    </div>
                ) : (
                    <p className="italic text-[var(--cl-subtext1)]">
                        Wähle rechts einen Blogeintrag aus, um ihn hier anzuzeigen.
                    </p>
                )}
            </div>


            {/* Rechte Seite: Liste, Suche, Filter */}
            <div className="w-full md:w-[30%] bg-[var(--cl-surface0)] p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-[var(--cl-green)]">🌿 Blogeinträge</h1>

                {/* Suchfeld */}
                <input
                    type="text"
                    placeholder="🔎 Nach Titel suchen..."
                    value={suchbegriff}
                    onChange={(e) => setSuchbegriff(e.target.value)}
                    className="w-full p-3 mb-4 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text)]
            placeholder:text-[var(--cl-subtext1)] border border-[var(--cl-teal)]
            shadow-[0_0_6px_1px_var(--cl-teal)] focus:outline-none focus:ring-2
            focus:ring-[var(--cl-green)] transition"
                />

                {/* Kategorie-Filter */}
                <select
                    value={ausgewaehlteKategorie}
                    onChange={(e) => setAusgewaehlteKategorie(e.target.value)}
                    className="w-full p-3 mb-6 rounded-md bg-[var(--cl-surface1)] text-[var(--cl-text)]
            border border-[var(--cl-teal)] shadow-[0_0_6px_1px_var(--cl-teal)]"
                >
                    {kategorien.map((kat, idx) => (
                        <option key={idx} value={kat}>{kat}</option>
                    ))}
                </select>

                {/* Beitragliste */}
                <ul className="space-y-4">
                    {gefilterteBeitraege.map((eintrag) => (
                        <li
                            key={eintrag.id}
                            onClick={() => setAusgewaehlt(eintrag)}
                            className="cursor-pointer p-4 rounded-md bg-[var(--cl-surface1)]
                hover:bg-[var(--cl-surface2)] border border-[var(--cl-teal)] transition"
                        >
                            <h2 className="text-lg font-semibold text-[var(--cl-blue)]">{eintrag.titel}</h2>
                            <p className="text-xs text-[var(--cl-subtext1)]">
                                {new Date(eintrag.datum).toLocaleDateString()} • {eintrag.kategorie}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BlogUebersicht;