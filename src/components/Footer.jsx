import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { getData } from '../utils/storage';
import CreateGroupModal from './Group/CreateGroupModal';

function Footer({ onCreateGroupFooter }) {

  const location = useLocation();
  const selectedGroupId = getData("selectedGroupId");
  return (
    <>
      <CreateGroupModal onCreateGroupFooter={onCreateGroupFooter} />
      <footer className="footer position-fixed bottom-0 start-0 end-0 bg-white">
        <div className="navIcons px-md-5 col-12 d-flex justify-content-center align-items-center py-1 py-md-3">
          <div className="col-10 d-flex justify-content-between align-items-center">
            <div className="iconContainer">
              <Link to="/" className={`d-flex flex-column justify-content-center align-items-center text-decoration-none text-black`}>
                <i className="bi bi-house-fill"></i>
                <p className="m-0 fw-light fs-6">Home</p>
              </Link>
            </div>
            <div className="iconContainer">
              <Link to={`/expenses/${selectedGroupId}`} className={`d-flex flex-column justify-content-center align-items-center text-decoration-none text-black`}
                href="groups.html">
                <i className="bi bi-people-fill"></i>
                <p className="m-0 fw-light fs-6">Groups</p>
              </Link>
            </div>
            {location.pathname === "/" && (
              <div className="iconContainer">
                <Link
                  to=""
                  className="d-flex flex-column justify-content-center align-items-center text-decoration-none text-black"
                  data-bs-toggle="modal"
                  data-bs-target="#createGroupModal"
                >
                  <i className="bi bi-plus-circle-fill"></i>
                  <p className="m-0 fw-light fs-6">Add</p>
                </Link>
              </div>
            )}
            <div className="iconContainer">
              <Link to={`/balances/${selectedGroupId}`} className={`d-flex flex-column justify-content-center align-items-center text-decoration-none text-black`}>
                <i className="fa-solid fa-scale-balanced"></i>
                <p className="m-0 fw-light fs-6">Balance</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
