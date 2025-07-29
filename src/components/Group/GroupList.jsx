import React from "react";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";

function GroupList({ groups, onDeleteGroup, currentUser }) {

  return (
    <div className="myGroups">


      <div className="groupTitle d-flex flex-wrap justify-content-sm-between justify-content-center align-items-center pt-3 px-4">
        <h4 className="fw-bold fs-5 mb-2 m-sm-0 mb-sm-0">MY GROUPS</h4>
        <button
          type="button"
          className="fw-medium btn btn-primary mx-5 mx-sm-0"
          data-bs-toggle="modal"
          data-bs-target="#createGroupModal"
          style={{ fontSize: "0.8rem" }}
        >
          + Create Group
        </button>
      </div>
      <CreateGroupModal />
      <div className="groupSection row pt-3">
        {groups.map((group) => (

          <GroupCard key={group.groupId} {...group} DeleteGroup = {onDeleteGroup} currentUser={currentUser}/>
        ))}
      </div>
    </div>
  );
}

export default GroupList;
