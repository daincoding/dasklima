import React, { useState } from 'react';

function FormElement() {
    const [beitrag, setBeitrag] = useState({
        titel: '',
        kurzbeschreibung: '',
        kategorie: '',
        text: ''
    });

    const [errors, setErrors] = useState({});

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
        // in App.jsx
        const gespeicherte = JSON.parse(localStorage.getItem('beitraege') || '[]');
        const neuerEintrag = {
            ...beitrag,
            id: Date.now(),
            datum: new Date().toISOString()
        };

        localStorage.setItem('beitraege', JSON.stringify([...gespeicherte, neuerEintrag]));
        setBeitrag({ titel: '', kurzbeschreibung: '', kategorie: '', text: '' });
    };

    return (
        <form onSubmit={speichern}>
            <div>
                <label htmlFor="titel">Titel *</label>
                <input
                    type="text"
                    name="titel"
                    id="titel"
                    value={beitrag.titel}
                    onChange={handleChange}
                    onBlur={() => setErrors(validate())}
                />
                {errors.titel && <span className="error">{errors.titel}</span>}
            </div>

            <div>
                <label htmlFor="kurzbeschreibung">Kurzbeschreibung</label>
                <textarea
                    name="kurzbeschreibung"
                    id="kurzbeschreibung"
                    value={beitrag.kurzbeschreibung}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="kategorie">Kategorie</label>
                <input
                    type="text"
                    name="kategorie"
                    id="kategorie"
                    value={beitrag.kategorie}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="text">Text</label>
                <textarea
                    name="text"
                    id="text"
                    value={beitrag.text}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Beitrag speichern</button>
        </form>
    );
}

export default FormElement;