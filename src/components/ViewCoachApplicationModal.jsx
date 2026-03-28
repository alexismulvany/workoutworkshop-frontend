import react, {useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import React, { useState } from "react";
import DOTWvailibility from "./DOTWavailibility.jsx";
import CoachInfoModal from "./CoachInfoModal";
import { AuthContext } from '../context/AuthContext';

const BIO_STYLES={
    display:"flex",
    backgroundColor:"#D9D9D9",
    borderRadius:"5%",
    width:"45%",
    height:"100%",
    maxHeight:"240px",
    marginTop:"25px",
    marginLeft:"5%",
    paddingTop: "5px",
    alignItems:"center",
    justifyContent:"center",
    flexDirection: "column"
}

const BIOTEXT_STYLES={
    display:"flex",
    backgroundColor:"#ffffff",
    width:"90%",
    height:"90%",
    maxHeight:"90%",
    borderRadius:"5%",
    marginBottom:"20px",
    paddingTop: "5px",
    paddingLeft:"5px",
    paddingRight:"5px",
    overflowWrap:"breakWord",
    overflowY:"auto"
}

export default function ViewCoachApplicationModal({ show, handleClose, coachId }) {
    const { user, token } = React.useContext(AuthContext);
    const [coach, setCoach] = react.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [availability, setAvailability] = React.useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [showCoachInfoModal, setShowCoachInfoModal] = useState(false);

    useEffect(() => {
        // Fetch specific coach application from the API
        const fetchCoachApplication = async () => {
            loading(true);
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-applications/${coachId}`;
                const response = await fetch( url, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch coach application");
                }
                const data = await response.json();
                setCoach(data);
                setAvailability(coach.availability);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoachApplication();
    }, []);

    function handleAcceot(){
        const acceptApplication = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-applications/${coachId}/approve`;
                const response = await fetch(url, {
                    method: "PUT",
                    headers : {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({admin_id: user.id}),
                });
                if (!response.ok) {
                    throw new Error("Failed to accept coach application");
                }
                toast.success("Coach application accepted successfully!");
                handleClose();
            } catch (error) {
                toast.error(error.message);
            }
        };

        acceptApplication();
    }

    function handleReject(){
        const rejectApplication = async (reason) => {
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-applications/${coachId}/reject`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ reason: reason, admin_id: user.id }),
                });
                if (!response.ok) {
                    throw new Error("Failed to reject coach application");
                }
                toast.success("Coach application rejected successfully!");
                handleClose();
            } catch (error) {
                toast.error(error.message);
            }
        }

        rejectApplication();
    }

    const handleRejectModal = () => {
        setShowRejectModal(true);
    };

    const handleRejectConfirm = () => {
        handleReject();
        console.log("Rejection reason:", rejectReason);
        setShowRejectModal(false);
        handleClose();
    };

    const handleRejectCancel = () => {
        setShowRejectModal(false);
    };

    const handleOpenCoachInfo = () => {
        setShowCoachInfoModal(true);
    };

    const handleCloseCoachInfo = () => {
        setShowCoachInfoModal(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Coach Application: {coach?.name} ({coach?.payment}/wk)</Modal.Title>
                    <Button onClick={handleClose}>x</Button>
                </Modal.Header>
                <Modal.Body>
                    <div style={BIO_STYLES}>
                        <h3>BIO</h3>
                        <div style={BIOTEXT_STYLES}>
                            <p>{coach?.bio}</p>
                        </div>
                    </div>
                    <div style={{display: "flex", backgroundColor:"#D9D9D9", borderRadius: "15px", width:"95%", height:"18%", marginTop:"5%", alignItems:"center", justifyContent:"center"}}>
                        <h3>Availability</h3>
                        <div style={{display: "flex",width:"95%", height:"100%", alignItems:"center", justifyContent:"center"}}>
                            <DOTWvailibility available={availability["SUN"]} DOTW={"Sun"}/>
                            <DOTWvailibility available={availability["M"]} DOTW={"Mon"}/>
                            <DOTWvailibility available={availability["T"]} DOTW={"Tue"}/>
                            <DOTWvailibility available={availability["W"]} DOTW={"Wed"}/>
                            <DOTWvailibility available={availability["TH"]} DOTW={"Thu"}/>
                            <DOTWvailibility available={availability["F"]} DOTW={"Fri"}/>
                            <DOTWvailibility available={availability["SAT"]} DOTW={"Sat"}/>
                        </div>
                    </div>
                    <div>
                        <h3>Certification</h3>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAcceot}>
                        Accept
                    </Button>
                    <Button variant="danger" onClick={handleRejectModal}>
                        Reject
                    </Button>
                    <Button variant="info" onClick={handleOpenCoachInfo}>
                        View Coach Info
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reject Reason Modal */}
            <Modal show={showRejectModal} onHide={handleRejectCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please provide a reason for rejecting this application:</p>
                    <textarea className="form-control" rows="3" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Enter rejection reason here..."/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRejectCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRejectConfirm}>
                        Confirm Rejection
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Coach Info Modal */}
            <CoachInfoModal
                show={showCoachInfoModal}
                handleClose={handleCloseCoachInfo}
                name={coach?.name}
                URL={coach?.profilePicture}
                price={coach?.payment}
                category={coach?.category}
                id={coachId}
                bio={coach?.bio}
                rating={coach?.rating}
            />
        </>
    );
}