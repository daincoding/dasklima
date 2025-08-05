import React from "react";
import { motion } from "framer-motion";
import BlogShowcase from "../components/BlogShowcase.jsx";

const Home = () => {
    const handleReset = () => {
        if (confirm("Möchtest du wirklich alle Kommentare und Blogeinträge zurücksetzen?")) {
            localStorage.removeItem("comments");
            localStorage.removeItem("beitraege");
            alert("Zurückgesetzt ✅");
            window.location.reload();
        }
    };

    return (
        <div className="relative min-h-screen bg-[var(--cl-base)] text-[var(--cl-text)] px-6 py-10">

            {/* Reset Button oben rechts */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={handleReset}
                    className="text-xs px-3 py-1 rounded bg-[var(--cl-error)] text-[var(--cl-text-dark)] font-medium opacity-60 hover:opacity-90 transition"
                    title="Alle Blogeinträge & Kommentare löschen"
                >
                    🧹 Reset
                </button>
            </div>

            {/* Begrüßungsbereich mit Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl mx-auto mt-20 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-transparent bg-clip-text mb-4">
                    D.A.S. Klima(Blog)
                </h1>

                <p className="text-lg md:text-xl text-[var(--cl-subtext1)] leading-relaxed">
                    Willkommen beim D.A.S. Klima(Blog) – deinem Ort für positive Nachrichten, kreative Ideen und inspirierende Geschichten rund um unser Klima. 🌿
                </p>
            </motion.div>

            <BlogShowcase />

        </div>
    );
};

export default Home;