import react, {useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import React, { useState, useContext } from "react";
import CoachInfoModal from "./CoachInfoModal";
import { AuthContext } from '../context/AuthContext';

export default function ViewCoachReportModal({show, handleClose, reportID}) {
    const { user , token} = useContext(AuthContext);
    const [report, setReport] = react.useState(null);
    const [coach, setCoach] = react.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showCoachInfoModal, setShowCoachInfoModal] = useState(false);
    const [showDisableModal, setShowDisableModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [disableReason, setDisableReason] = useState("");
    const [disableDuration, setDisableDuration] = useState({ day: "", month: "", year: "" });
    const [banReason, setBanReason] = useState("");

    useEffect(() => {
        // Fetch specific coach report from the API
        const fetchCoachReport = async () => {
            setLoading(true);
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-reports/${reportID}`;
                const response = await fetch( url, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch coach report");
                }
                const data = await response.json();
                setReport(data);
                setCoach(data.coach);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
    }

        fetchCoachReport();
    }, [reportID]);

    function handleDismissReport() {
        const dismissReport = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-reports/${reportID}/dismiss`;
                const response = await fetch( url, {
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to dismiss coach report");
                }
                toast.success("Coach report dismissed successfully!");
                handleClose();
            } catch (error) {
                toast.error(error.message);
            }
        };

        dismissReport();
    }

    const handleViewCoachInfo = () => {
        setShowCoachInfoModal(true);
    };

    const handleCloseCoachInfoModal = () => {
        setShowCoachInfoModal(false);
    };

    const handleDisableModal = () => {
        setShowDisableModal(true);
    };

    const handleBanModal = () => {
        setShowBanModal(true);
    };

    const handleDisableConfirm = () => {
        handleDisable();
        console.log("Disable reason:", disableReason);
        console.log("Disable duration:", disableDuration);
        setShowDisableModal(false);
    };

    function handleDisable() {
        const disableCoach = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-reports/${reportID}/disable`;
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ reason: disableReason, day: disableDuration.day, month: disableDuration.month, year: disableDuration.year }),
                });
                if (!response.ok) {
                    throw new Error("Failed to disable coach");
                }
                toast.success("Coach disabled successfully!");
                handleClose();
            }
            catch (error) {
                toast.error(error.message);
            }
        };

        disableCoach();
    }

    const handleBanConfirm = () => {
        handleBan();
        console.log("Ban reason:", banReason);
        setShowBanModal(false);
    };

    function handleBan() {
        const banCoach = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/admin/coach-reports/${reportID}/ban`;
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({admin_id: user.id, reason: banReason }),
                });
                if (!response.ok) {
                    throw new Error("Failed to ban coach");
                }
                toast.success("Coach banned successfully!");
                handleClose();
            }
            catch (error) {
                toast.error(error.message);
            }
        }

        banCoach();
    }

    const handleModalClose = () => {
        setShowDisableModal(false);
        setShowBanModal(false);
    };

    return(
        <>
            {/* Main modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Coach Report: {coach.name} Report ID: ${report.id})</Modal.Title>
                    <Button onClick={handleClose}>x</Button>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Report ID:</strong> {report.report_id}</p>
                    <Button onClick={handleViewCoachInfo}>View Profile</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDismissReport}>
                        Dismiss Report
                    </Button>
                    <Button variant="danger" onClick={handleDisableModal}>
                        Disable Coach
                    </Button>
                    <Button variant="danger" onClick={handleBanModal}>
                        Ban Coach
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* disable account modal */}
            <Modal show={showDisableModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Disable Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please provide the duration for disabling the account:</p>
                    <div className="d-flex justify-content-between">
                        <input type="number" className="form-control me-2" placeholder="Day" value={disableDuration.day} onChange={(e) => setDisableDuration({ ...disableDuration, day: e.target.value })}/>
                        <input type="number" className="form-control me-2" placeholder="Month" value={disableDuration.month} onChange={(e) => setDisableDuration({ ...disableDuration, month: e.target.value })}/>
                        <input type="number" className="form-control" placeholder="Year" value={disableDuration.year} onChange={(e) => setDisableDuration({ ...disableDuration, year: e.target.value })}/>
                    </div>
                    <p className="mt-3">Reason for disabling the account:</p>
                    <textarea className="form-control" rows="3" value={disableReason} onChange={(e) => setDisableReason(e.target.value)} placeholder="Enter reason here..."/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={handleDisableConfirm}>
                        Confirm Disable
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Ban account modal */}
            <Modal show={showBanModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ban Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please provide a reason for banning the account:</p>
                    <textarea className="form-control" rows="3" value={banReason} onChange={(e) => setBanReason(e.target.value)} placeholder="Enter reason here..."/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleBanConfirm}>
                        Confirm Ban
                    </Button>
                </Modal.Footer>
            </Modal>

            {showCoachInfoModal && (
                <CoachInfoModal
                    show={showCoachInfoModal}
                    handleClose={handleCloseCoachInfoModal}
                    name={coach.name}
                    URL={coach.URL}
                    price={coach.price}
                    category={coach.category}
                    id={coach.id}
                    bio={coach.bio}
                    rating={coach.rating}
                />
            )}
        </>
    )
}