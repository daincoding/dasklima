import { useState, useEffect } from 'react';
import CommentSection from "../components/CommentSection.jsx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

function BlogUebersicht() {
    const [beitraege, setBeitraege] = useState([]);
    const [ausgewaehlt, setAusgewaehlt] = useState(null);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [ausgewaehlteKategorie, setAusgewaehlteKategorie] = useState('Alle');
    const [favoriten, setFavoriten] = useState([]);
    const [nurFavoriten, setNurFavoriten] = useState(false);

    useEffect(() => {
        fetch('/data/blogeintrag.json')
            .then((antwort) => antwort.json())
            .then((jsonDaten) => {
                const lokaleEintraege = JSON.parse(localStorage.getItem('beitraege') || '[]');
                const kombi = [...jsonDaten, ...lokaleEintraege];
                setBeitraege(kombi);
            })
            .catch((fehler) => console.error('Fehler beim Laden der Daten:', fehler));
    }, []);

    const { rolle } = useRole();
    const navigate = useNavigate();

    const kategorien = ['Alle',  ...new Set(beitraege.map(eintrag => eintrag.kategorie))];

    const gefilterteBeitraege = beitraege
        .filter(eintrag =>
            eintrag.titel.toLowerCase().includes(suchbegriff.toLowerCase()) &&
            (ausgewaehlteKategorie === 'Alle' || eintrag.kategorie === ausgewaehlteKategorie) &&
            (!nurFavoriten || favoriten.includes(eintrag.id))
        )
        .sort((a, b) => new Date(b.datum) - new Date(a.datum))

    // 🆕 Herz-Toggle Funktion
    const favoritenToggle = (id) => {
        if (favoriten.includes(id)) {
            setFavoriten(favoriten.filter(favId => favId !== id));
        } else {
            setFavoriten([...favoriten, id]);
        }
    };

    const blogEintragLoeschen = (id) => {
        // 1. Entferne aus `beitraege`
        const neueListe = beitraege.filter((eintrag) => eintrag.id !== id);
        setBeitraege(neueListe);

        // 2. Entferne aus localStorage (nur eigene Einträge löschen, nicht die aus JSON-Datei!)
        const lokaleEintraege = JSON.parse(localStorage.getItem("beitraege") || "[]");
        const aktualisiert = lokaleEintraege.filter((eintrag) => eintrag.id !== id);
        localStorage.setItem("beitraege", JSON.stringify(aktualisiert));

        // 3. Falls der gelöschte Beitrag ausgewählt war, Auswahl zurücksetzen
        if (ausgewaehlt?.id === id) {
            setAusgewaehlt(null);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto text-[var(--cl-text)]">

            {/* Linke Seite: Detailansicht */}
            <div className="w-full md:w-[70%] bg-[var(--cl-surface0)] p-6 rounded-xl shadow-md">
                {ausgewaehlt ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-[var(--cl-sky)]">{ausgewaehlt.titel}</h2>
                        <div className="flex justify-center mb-4">
                            <img
                                src={`/images/${ausgewaehlt.bild}`}
                                alt={ausgewaehlt.titel}
                                className="w-[600px] h-[300px] object-cover rounded-xl border-4 border-[var(--cl-green)] shadow-xl mt-6 mx-auto mb-4"
                            />
                        </div>
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

                {/* Favoriten-Filter mit Icon */}
                <div className="flex items-center gap-3 mb-6">
                    {/* Herz-Icon */}
                    <div className="text-xl">
                        {nurFavoriten
                            ? <AiFillHeart className="text-red-500" />
                            : <AiOutlineHeart className="text-[var(--cl-subtext1)]" />}
                    </div>

                    {/* Slider Toggle */}
                    <div
                        onClick={() => setNurFavoriten(!nurFavoriten)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
                        ${nurFavoriten ? 'bg-[var(--cl-green)]' : 'bg-[var(--cl-surface2)]'}`}
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300
                        ${nurFavoriten ? 'translate-x-6' : 'translate-x-0'}`}
                        />
                    </div>
                </div>


                {/* Beitragliste */}
                <ul className="space-y-4">
                    {gefilterteBeitraege.map((eintrag) => (
                        <li
                            key={eintrag.id}
                            onClick={() => setAusgewaehlt(eintrag)}
                            className="cursor-pointer p-4 pr-10 rounded-md bg-[var(--cl-surface1)]
                            hover:bg-[var(--cl-surface2)] border border-[var(--cl-teal)] transition relative"
                        >
                            <h2 className="text-lg font-semibold text-[var(--cl-blue)]">{eintrag.titel}</h2>
                            <p className="text-xs text-[var(--cl-subtext1)]">
                                {new Date(eintrag.datum).toLocaleDateString()} • {eintrag.kategorie}
                            </p>

                            {rolle === 'admin' && (
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate("/newentry", { state: { bearbeiteEintrag: eintrag } });
                                        }}
                                        className="px-2 py-1 text-sm rounded bg-[var(--cl-warning)] text-[var(--cl-text-dark)] hover:opacity-80 transition"
                                    >
                                        ✏️ Bearbeiten
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            blogEintragLoeschen(eintrag.id);
                                        }}
                                        className="px-2 py-1 text-sm rounded bg-[var(--cl-error)] text-[var(--cl-text)] hover:opacity-80 transition"
                                    >
                                        🗑️ Löschen
                                    </button>
                                </div>
                            )}

                            {/* Herz-Icon */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    favoritenToggle(eintrag.id);
                                }}
                                className="absolute top-2 right-2 text-xl"
                            >
                                {favoriten.includes(eintrag.id)
                                    ? <AiFillHeart className="text-red-500" />
                                    : <AiOutlineHeart />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BlogUebersicht;