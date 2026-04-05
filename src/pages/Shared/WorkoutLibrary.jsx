//imports
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// Styling
const PAGE_CONTAINER = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    width: "100%",
    height: "100vh",
    fontFamily: "sans-serif"
};

const TITLE_STYLE = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#000"
};

const LIST_CONTAINER = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    gap: "15px"
};

const ROW_STYLE = {
    display: "flex",
    width: "100%",
    gap: "15px"
};

const LOG_BOX = {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: "15px",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    color: "#000",
    fontSize: "1rem"
};
const BACK_BTN = {
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "10px 30px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "20px",
    alignSelf: "flex-start"
};

export default function WorkoutLibrary() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1) //goes back one page
    };

    return (
        <div style={PAGE_CONTAINER}>
            <h1 style={TITLE_STYLE}>Workout Library</h1>

            <div style={LIST_CONTAINER}>

                <button style={BACK_BTN} onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    );
}