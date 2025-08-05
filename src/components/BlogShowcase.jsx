import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BlogShowcase = () => {
    const navigate = useNavigate();
    const [alleEintraege, setAlleEintraege] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetch("/data/blogeintrag.json")
            .then((antwort) => antwort.json())
            .then((jsonDaten) => {
                const lokaleEintraege = JSON.parse(localStorage.getItem("beitraege") || "[]");
                const kombi = [...jsonDaten, ...lokaleEintraege];

                const heute = new Date().toISOString().split("T")[0];
                const veroeffentlichteEintraege = kombi.filter(eintrag => {
                    const datum = eintrag.veroeffentlichungsdatum || heute;
                    return datum <= heute;
                });

                const sortiert = veroeffentlichteEintraege.sort((a, b) => new Date(b.datum) - new Date(a.datum));
                setAlleEintraege(sortiert);
            })
            .catch((fehler) => console.error("Fehler beim Laden der Daten:", fehler));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 3) % alleEintraege.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [alleEintraege]);

    const aktuelleGruppe = alleEintraege.slice(index, index + 3);

    return (
        <div className="mt-16">
            <h3 className="text-center text-2xl font-bold text-[var(--cl-green)] mb-6">
                🌱 Aktuelle Beiträge aus dem Klimablog
            </h3>

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4"
                >
                    {aktuelleGruppe.map((eintrag) => (
                        <div
                            key={eintrag.id}
                            onClick={() => navigate("/blogoverview", { state: { fokusEintrag: eintrag.id } })}
                            className="cursor-pointer rounded-xl shadow-md border border-[var(--cl-surface2)]
                            bg-gradient-to-br from-[var(--cl-surface1)] via-[var(--cl-surface2)] to-[var(--cl-surface1)]
                            hover:shadow-[0_0_10px_var(--cl-green)] transition duration-300 overflow-hidden"
                        >
                            {/* Bild-Banner */}
                            {eintrag.bild && (
                                <div className="w-full h-[160px] border-b-2 border-[var(--cl-green)] shadow-md">
                                    <img
                                        src={eintrag.bild.startsWith("data:") ? eintrag.bild : `/images/${eintrag.bild}`}
                                        alt={eintrag.titel}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Inhalt */}
                            <div className="p-4">
                                <h4 className="text-lg font-bold text-[var(--cl-green)] mb-2">
                                    {eintrag.titel}
                                </h4>
                                <p className="text-sm text-[var(--cl-subtext0)] line-clamp-3">
                                    {eintrag.kurzbeschreibung || "Kein Beschreibungstext vorhanden."}
                                </p>
                                <p className="mt-4 text-xs text-[var(--cl-subtext1)] italic">
                                    {new Date(eintrag.datum).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BlogShowcase;