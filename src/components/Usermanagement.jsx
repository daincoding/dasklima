import { useState } from "react";

const Usermanagement = () => {
    const [nutzerListe, setNutzerListe] = useState([
        { id: 1, name: "Anna", istAdmin: false, email: "anna@example.com", registered: "01.03.2024" },
        { id: 2, name: "Ben", istAdmin: false, email: "ben@example.com", registered: "12.04.2024" },
        { id: 3, name: "Clara", istAdmin: true, email: "clara@example.com", registered: "27.02.2024" },
        { id: 4, name: "David", istAdmin: false, email: "david@example.com", registered: "19.05.2024" },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toggleAdminStatus = (id) => {
        const aktualisiert = nutzerListe.map((n) =>
            n.id === id ? { ...n, istAdmin: !n.istAdmin } : n
        );
        setNutzerListe(aktualisiert);
    };

    const zeigeProfil = (nutzer) => {
        setSelectedUser(nutzer);
        setShowModal(true);
    };

    const schliesseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="relative max-w-xl mx-auto bg-[var(--cl-surface0)] text-[var(--cl-text)] p-6 mt-10 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-[var(--cl-mauve)] mb-6">Admin Testseite</h2>
            <p className="mb-4 text-[var(--cl-subtext1)]">
                ⚙️ Usermanagement
            </p>

            <ul className="space-y-4">
                {nutzerListe.map((nutzer) => (
                    <li
                        key={nutzer.id}
                        className="flex justify-between items-center p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-surface2)]"
                    >
                        <button
                            onClick={() => zeigeProfil(nutzer)}
                            className="text-left text-[var(--cl-blue)] font-medium hover:underline"
                        >
                            {nutzer.name}
                        </button>
                        <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--cl-subtext1)]">
                        {nutzer.istAdmin ? "Admin" : "Benutzer"}
                        </span>
                            <div
                                onClick={() => toggleAdminStatus(nutzer.id)}
                                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
                            ${nutzer.istAdmin ? 'bg-[var(--cl-green)]' : 'bg-[var(--cl-surface2)]'}`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300
                            ${nutzer.istAdmin ? 'translate-x-6' : 'translate-x-0'}`}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* MODAL */}
            {showModal && selectedUser && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    onClick={schliesseModal}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[var(--cl-surface0)] text-[var(--cl-text)] rounded-lg p-6 w-[90%] max-w-md shadow-lg border border-[var(--cl-teal)]"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[var(--cl-green)]">
                            👤 Nutzerprofil: {selectedUser.name}
                        </h3>
                        <p><strong>E-Mail:</strong> {selectedUser.email}</p>
                        <p><strong>Rolle:</strong> {selectedUser.istAdmin ? "Admin" : "Benutzer"}</p>
                        <p><strong>Registriert seit:</strong> {selectedUser.registered}</p>

                        <button
                            onClick={schliesseModal}
                            className="mt-6 bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded font-bold hover:opacity-90"
                        >
                            Schließen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Usermanagement;

//region LEGACY CODE 🧑‍💻
{/* LEGACY CODE */}
{/*
            import { useState } from "react";

            export default function Usermanagement() {
                const [dropdownOffen, setDropdownOffen] = useState(false);
                const [rolle, setRolle] = useState(null);

                const rolleWaehlen = (name) => {
                    setRolle(name);
                    setDropdownOffen(false);
                };

                const rollentext = () => {
                    switch (rolle) {
                        case "besucher":
                            return <p>Kurzer Text für Besucher.</p>;
                        case "benutzer":
                            return <p>Mehr Text für <strong>Benutzer</strong>.</p>;
                        case "admin":
                            return <p>Noch mehr Text für <strong>Admin</strong>.</p>;
                        default:
                            return null;
                    }
                };

                return (
                    <div>
                        <h2>Usermanagement</h2>
                        <ul>
                            <li>
                                <button onClick={() => setDropdownOffen(!dropdownOffen)}>
                                    Benutzertyp auswählen
                                </button>
                                {dropdownOffen && (
                                    <ul>
                                        <li><button onClick={() => rolleWaehlen("benutzer")}>Benutzer</button></li>
                                        <li><button onClick={() => rolleWaehlen("admin")}>Admin</button></li>
                                        <li><button onClick={() => rolleWaehlen("besucher")}>Besucher</button></li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                        {rollentext()}
                    </div>
                );
            }
            */}

//endregion