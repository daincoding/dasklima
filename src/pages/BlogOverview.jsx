import { useState, useEffect } from 'react';

function BlogUebersicht() {
    const [beitraege, setBeitraege] = useState([]);
    const [ausgewählt, setAusgewählt] = useState(null);
    const [suchbegriff, setSuchbegriff] = useState('');
    const [ausgewählteKategorie, setAusgewählteKategorie] = useState('Alle');

    // Ruft die JSON-Datei ab und speichert sie in beitraege
    useEffect(() => {
        fetch('/data/blogeintrag.json')
            .then((antwort) => antwort.json())
            .then((daten) => setBeitraege(daten))
            .catch((fehler) => console.error('Fehler beim Laden der Daten:', fehler));
    }, []);

    // Alle Kategorien aus den Beiträgen extrahieren und in Liste speichern
    const kategorien = ['Alle', ...new Set(beitraege.map(eintrag => eintrag.kategorie))];

    // Beiträge filtern nach Suchbegriff und Kategorie
    const gefilterteBeitraege = beitraege
        .filter(eintrag =>
            eintrag.titel.toLowerCase().includes(suchbegriff.toLowerCase()) &&
            (ausgewählteKategorie === 'Alle' || eintrag.kategorie === ausgewählteKategorie)
        )
        .sort((a, b) => new Date(b.datum) - new Date(a.datum));

    return (
        <div >
            <h1>🌍 Klima-Blog Übersicht</h1>
    {/*Suchfeld für Titel*/}
            <input
                type="text"
                placeholder="🔎 Nach Titel suchen..."
                value={suchbegriff}
                onChange={(e) => setSuchbegriff(e.target.value)}
            />
    {/*Dropdown-Menü für Kategorien*/}
            <select
                value={ausgewählteKategorie}
                onChange={(e) => setAusgewählteKategorie(e.target.value)}
            >
                {kategorien.map((kat, idx) => (
                    <option key={idx} value={kat}>{kat}</option>
                ))}
            </select>
    {/*Zeigt die gefilterten Beiträge als Liste*/}
            <ul>
                {gefilterteBeitraege.map((eintrag) => (
                    <li key={eintrag.id} style={{ cursor: 'pointer' }}>
                        <strong onClick={() => setAusgewählt(eintrag)}>{eintrag.titel}</strong>
                    </li>
                ))}
            </ul>
    {/*Wenn ein Beitrag ausgewählt ist, zeige das an*/}
            {ausgewählt && (
                <div >
                    <h2>{ausgewählt.titel}</h2>
                    <p><em>{ausgewählt.kategorie} • {new Date(ausgewählt.datum).toLocaleDateString()}</em></p>
                    <p><strong>{ausgewählt.kurzbeschreibung}</strong></p>
                    <p>{ausgewählt.text}</p>
                </div>
            )}
        </div>
    );
}

export default BlogUebersicht