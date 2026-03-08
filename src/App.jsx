import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

//Page Imports
import Home from "./pages/Shared/Home.jsx";
import WorkoutBuilder from "./pages/Shared/WorkoutBuilder.jsx";
import Coach from "./pages/Coach/Coach.jsx";
import Admin from "./pages/Admin/Admin.jsx";


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <main style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/workoutbuilder" element={<WorkoutBuilder/>} />
                        <Route path="/coach" element={<Coach/>} />
                        <Route path="/admin" element={<Admin/>} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
