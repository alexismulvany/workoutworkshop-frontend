import React, { useState, useEffect } from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ userId, token }) => {
    const [pictures, setPictures] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const fetchPictures = async () => {
        try {
            const apiBase = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiBase}/user/progress-pictures/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (result.status === 'success') {
                setPictures(result.data);
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    useEffect(() => {
        if (userId) { fetchPictures(); }
    }, [userId]);

    const getDisplayedPictures = () => {
        if (showAll || pictures.length <= 3) return pictures;
        if (pictures.length === 0) return [];

        const latest = pictures[0];
        const oldest = pictures[pictures.length - 1];
        const midIdx = Math.floor((pictures.length - 1) / 2);
        const midway = pictures[midIdx];

        return [oldest, midway, latest].filter(Boolean);
    };

    const displayedPics = getDisplayedPictures();

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('progress_image', selectedFile);
        formData.append('user_id', userId);

        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiBase}/user/upload-progress-picture`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                setSelectedFile(null);
                const fileInput = document.getElementById('progress-upload-input');
                if (fileInput) fileInput.value = "";
                fetchPictures();
            }
        } catch (error) {
            console.error("Upload failed.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (pictureId) => {
        try {
            const apiBase = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiBase}/user/delete-progress-picture/${pictureId}/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                // update list
                const updatedList = pictures.filter(p => p.picture_id !== pictureId);
                setPictures(updatedList);

                // Reset showAll if images are less than 3 or there are no images left
                if (updatedList.length <= 3) {
                    setShowAll(false);
                }
            } else {
                alert("Failed to delete photo.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="progress-tracker">
            <h3>My Progress Photos</h3>
            <p>Track pictures of your progress.</p>
            <form onSubmit={handleUpload} className="progress-upload-form">
                {/* Photo Upload */}
                <input id="progress-upload-input" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} style={{ display: 'none' }}/>
                <label htmlFor="progress-upload-input" className="progress-upload-label">
                    {selectedFile ? `Selected: ${selectedFile.name}` : " Upload a Progress Photo"}
                </label>

                {/* Upload Button */}
                {selectedFile && (
                    <button type="submit" disabled={loading} className="progress-upload-submit">
                        {loading ? 'Uploading...' : 'Upload Now'}
                    </button>
                )}
            </form>

            <div className="progress-grid">
                {pictures.length === 0 ? (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666' }}>
                        No progress photos yet. Upload your first one above!
                    </p>
                ) : (
                    displayedPics.map((pic, index) => (
                        <div key={pic.picture_id} className="progress-card" style={{ position: 'relative' }}>
                            {/* Delete Button - Only shows in "Show All" mode or if less than 3 images */}
                            {(showAll || pictures.length <= 3) && (
                                <button onClick={() => handleDelete(pic.picture_id)} className="delete-btn" title="Delete Photo">×</button>
                            )}

                            {!showAll && pictures.length > 3 && (
                                <span className="progress-badge">
                                {index === 0 ? "Start" : index === 1 ? "Midway" : "Latest"}
                            </span>
                            )}
                            <img src={pic.image_url} alt="Progress" className="progress-image" />
                            <p className="progress-date">
                                {pic.create_date ? new Date(pic.create_date).toLocaleDateString() : 'Invalid Date'}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div className="progress-toggle-row">
                {pictures.length > 3 && (
                    <button onClick={() => setShowAll(!showAll)} className="progress-toggle-btn">
                        {showAll ? 'Show Highlights' : `Show All ${pictures.length} Photos`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProgressTracker;