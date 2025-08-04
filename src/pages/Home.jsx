import React from "react";
import DesignShowcase from "../components/DesignShowcase.jsx";

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
        <div className="min-h-screen bg-[var(--cl-base)] text-[var(--cl-text)] px-6 py-10">

            <div className="mb-6 flex justify-end">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded bg-[var(--cl-error)] text-[var(--cl-text-dark)] font-semibold hover:opacity-90 transition"
                >
                    🧹 Reset Kommentare
                </button>
            </div>

            <DesignShowcase />
        </div>
    );
};

export default Home;