import React from 'react';
import { useNavigate } from 'react-router';
import { getData } from '../utils/storage';

function Header() {

    const currentUser = getData("currentUser")
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
        window.location.reload();
    };


    return (
        <>
            <header>
                <div className="header d-flex justify-content-between align-items-center py-3">
                    <div>
                        <h3 className="fw-bold">SPLIT PAYMENT APP</h3>
                    </div>
                    {/* <button className="btn btn-primary" onClick={handleLogout}>Logout</button> */}
                    <div className="userIconContainer d-flex justify-content-center align-items-center rounded-circle p-3"
                        style={{ "backgroundColor": "rgb(219 220 244)",cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#profileModal"
                        title='UserProfile'
                    >
                        <i className="fa-solid fa-user" style={{ "color": "#0049c7" }}></i>
                    </div>
                    {/* Profile Modal */}
                    <div className="modal fade" id="profileModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">User Profile</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <div className="modal-body">
                                    {currentUser ? (
                                        <>
                                            <p><strong>Username:</strong> {currentUser.userData.userName}</p>
                                            <p><strong>Email:</strong> {currentUser.userData.email}</p>
                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={handleLogout}
                                                data-bs-dismiss="modal"
                                            >
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary w-100 mb-2">Sign In</button>
                                            <button className="btn btn-outline-primary w-100">Sign Up</button>
                                        </>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    );
}

export default Header;
