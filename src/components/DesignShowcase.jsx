import React from 'react';

function DesignShowcase() {
    return (
        <div>
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">🌿 KlimaBlog</h1>
                <p className="text-[var(--cl-subtext1)] text-lg">
                    Für eine grünere Zukunft – Designsystem Showcase
                </p>
            </header>

            {/* Color Boxes */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                    ["Base", "--cl-base"],
                    ["Mantle", "--cl-mantle"],
                    ["Crust", "--cl-crust"],
                    ["Text", "--cl-text"],
                    ["Green", "--cl-green"],
                    ["Blue", "--cl-blue"],
                    ["Teal", "--cl-teal"],
                    ["Sky", "--cl-sky"],
                ].map(([label, varname]) => (
                    <div
                        key={label}
                        className="rounded-xl h-20 flex items-center justify-center text-sm font-medium shadow text-[var(--cl-text-dark)]"
                        style={{
                            backgroundColor: `var(${varname})`,
                            color: varname === "--cl-base" ? "black" : "white",
                        }}
                    >
                        {label}
                    </div>
                ))}
            </section>

            {/* Sample Card */}
            <div className="bg-[var(--cl-surface0)] text-[var(--cl-text)] rounded-xl p-6 shadow-lg max-w-xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold mb-2">🌱 Nachhaltigkeit</h2>
                <p className="text-[var(--cl-subtext0)] mb-4">
                    Nachhaltigkeit bedeutet, Ressourcen verantwortungsvoll zu nutzen, damit kommende Generationen eine lebenswerte Umwelt vorfinden.
                </p>
                <button className="px-4 py-2 rounded-lg bg-[var(--cl-green)] text-[var(--cl-text-dark)] font-semibold hover:opacity-90 transition">
                    Mehr erfahren
                </button>
            </div>

            {/* Alerts */}
            <div className="max-w-xl mx-auto space-y-4">
                <div className="bg-[var(--cl-success)] text-[var(--cl-text-dark)] px-4 py-3 rounded-lg shadow">
                    ✅ Erfolgreich gespeichert!
                </div>
                <div className="bg-[var(--cl-warning)] text-[var(--cl-text)] px-4 py-3 rounded-lg shadow">
                    ⚠️ Achtung: Änderungen wurden noch nicht übernommen.
                </div>
                <div className="bg-[var(--cl-error)] text-[var(--cl-text)] px-4 py-3 rounded-lg shadow">
                    ❌ Fehler: Verbindung zum Server fehlgeschlagen.
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 text-center text-sm text-[var(--cl-subtext0)]">
                © 2025 KlimaBlog. Gemeinsam für morgen. 🌍
            </footer>
        </div>
    );
}

export default DesignShowcase;