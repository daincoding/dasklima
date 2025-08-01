import React from "react";
import CommentSection from "../components/CommentSection.jsx";
import DesignShowcase from "../components/DesignShowcase.jsx";

const Home = () => {
    return (
        <div className="min-h-screen bg-[var(--cl-base)] text-[var(--cl-text)] px-6 py-10">

            <DesignShowcase />

            <CommentSection />

        </div>
    );
};

export default Home;