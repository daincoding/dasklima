import { useState } from "react";

export default function Usermanagement() {

    // Zustand für das Öffnen/Schließen der Dropdown-Liste
    const [dropdownOffen, setDropdownOffen] = useState(false);

    // Zustand für die aktuell gewählte Rolle
    const [rolle, setRolle] = useState(null);

    // Beim Klick auf eine Rolle: Rolle setzen und Dropdown schließen

    const rolleWaehlen = (name) => {
        setRolle(name);
        setDropdownOffen(false);
    };

    // Text abhängig von der gewählten Rolle zurückgeben

    const rollentext = () => {
        switch (rolle) {
            case "besucher":
                return <p>Kurzer Text für Besucher.</p>;

            case "benutzer":
                return (
                    <p>
                        Mehr Text für <strong>Benutzer</strong>. Hier könnte eine ausführlichere
                        Beschreibung stehen.
                    </p>
                );
            case "admin":
                return (
                    <p>
                        Noch mehr Text für <strong>Admin</strong>. Dieser Abschnitt ist am
                        längsten, weil Admins mehr Informationen benötigen.
                    </p>
                );
            default:
                return null; // Noch keine Rolle gewählt
        }
    };

    return (
        <div>
            <h2>Usermanagement</h2>

            {/* Erste Ebene: Button zum Öffnen des Dropdowns */}
            <ul>
                <li>
                    <button onClick={() => setDropdownOffen(!dropdownOffen)}>
                        Benutzertyp auswählen
                    </button>

                    {/* Zweite Ebene: Rollenwahl */}
                    {dropdownOffen && (
                        <ul>
                            <li>
                                <button onClick={() => rolleWaehlen("benutzer")}>Benutzer</button>
                            </li>
                            <li>
                                <button onClick={() => rolleWaehlen("admin")}>Admin</button>
                            </li>
                            <li>
                                <button onClick={() => rolleWaehlen("besucher")}>Besucher</button>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>

            {/* Rollenspezifischer Text */}
            {rollentext()}
        </div>
    );
}
