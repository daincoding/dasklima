import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function FormElement() {
    const location = useLocation();
    const navigate = useNavigate();

    const eintragZumBearbeiten = location.state?.bearbeiteEintrag;

    const [beitrag, setBeitrag] = useState({
        titel: '',
        kurzbeschreibung: '',
        kategorie: '',
        text: '',
        veröffentlichungsdatum: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (eintragZumBearbeiten) {
            setBeitrag({
                titel: eintragZumBearbeiten.titel || '',
                kurzbeschreibung: eintragZumBearbeiten.kurzbeschreibung || '',
                kategorie: eintragZumBearbeiten.kategorie || '',
                text: eintragZumBearbeiten.text || '',
                veröffentlichungsdatum: eintragZumBearbeiten.veröffentlichungsdatum || ''
            });
        }
    }, [eintragZumBearbeiten]);

    const handleChange = (e) => {
        setBeitrag({ ...beitrag, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!beitrag.titel.trim()) {
            newErrors.titel = 'Muss ausgefüllt werden.';
        }
        return newErrors;
    };

    const speichern = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const gespeicherte = JSON.parse(localStorage.getItem('beitraege') || '[]');

        if (eintragZumBearbeiten) {
            const aktualisiert = gespeicherte.map(e =>
                e.id === eintragZumBearbeiten.id
                    ? { ...eintragZumBearbeiten, ...beitrag }
                    : e
            );
            localStorage.setItem('beitraege', JSON.stringify(aktualisiert));
        } else {
            const neuerEintrag = {
                ...beitrag,
                id: Date.now(),
                datum: new Date().toISOString()
            };
            localStorage.setItem('beitraege', JSON.stringify([...gespeicherte, neuerEintrag]));
        }

        navigate("/blogoverview");
    };

    return (
        <form onSubmit={speichern}
              className="max-w-3xl mx-auto p-6 bg-[var(--cl-surface0)] text-[var(--cl-text)] rounded-xl shadow-[0_0_8px_1px_var(--cl-teal)] space-y-6 mt-6"
        >
            <h2 className="text-2xl font-bold text-[var(--cl-green)] mb-4">
                {eintragZumBearbeiten ? 'Beitrag bearbeiten' : 'Neuen Blogeintrag erstellen'}
            </h2>

            {/* Titel */}
            <div>
                <label htmlFor="titel" className="block text-sm font-semibold mb-1">
                    Titel <span className="text-[var(--cl-red)]">*</span>
                </label>
                <input
                    type="text"
                    name="titel"
                    id="titel"
                    value={beitrag.titel}
                    onChange={handleChange}
                    onBlur={() => setErrors(validate())}
                    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)]"
                />
                {errors.titel && (
                    <p className="text-sm text-[var(--cl-red)] mt-1">{errors.titel}</p>
                )}
            </div>

            {/* Kurzbeschreibung */}
            <div>
                <label htmlFor="kurzbeschreibung" className="block text-sm font-semibold mb-1">
                    Kurzbeschreibung
                </label>
                <textarea
                    name="kurzbeschreibung"
                    id="kurzbeschreibung"
                    value={beitrag.kurzbeschreibung}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)]"
                />
            </div>

            {/* Kategorie */}
            <div>
                <label htmlFor="kategorie" className="block text-sm font-semibold mb-1">
                    Kategorie
                </label>
                <input
                    type="text"
                    name="kategorie"
                    id="kategorie"
                    value={beitrag.kategorie}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)]"
                />
            </div>

            {/* Text */}
            <div>
                <label htmlFor="text" className="block text-sm font-semibold mb-1">
                    Text
                </label>
                <textarea
                    name="text"
                    id="text"
                    value={beitrag.text}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)]"
                />
            </div>

            {/* Veröffentlichungsdatum */}
            <div>
                <label htmlFor="veröffentlichungsdatum" className="block text-sm font-semibold mb-1">
                    Veröffentlichungsdatum
                </label>
                <input
                    type="date"
                    name="veröffentlichungsdatum"
                    id="veröffentlichungsdatum"
                    value={beitrag.veröffentlichungsdatum}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-[var(--cl-surface1)] border border-[var(--cl-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-green)]"
                />
            </div>

            {/* Submit-Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-[var(--cl-green)] text-[var(--cl-text-dark)] font-semibold hover:opacity-90 transition"
                >
                    Beitrag speichern
                </button>
            </div>
        </form>
    );
}

export default FormElement;