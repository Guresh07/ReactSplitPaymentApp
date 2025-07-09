import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getData } from "../../utils/storage";


function CreateGroupModal({ onCreateGroup, fetchGroups, onCreateGroupFooter }) {
  const currentUser = getData("currentUser");
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "" },
    { name: "", email: "" },
  ]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    const newGroup = {
      groupId: uuidv4(),
      groupName,
      category,
      description,
      groupMembers: members.map((member) => ({
        memberId: uuidv4(),
        name: member.name,
        email: member.email,
        balanceAmount: 0,
      })),
      expenses: [],
      payments: [],
      totalAmount: 0,
      youOwed: 0,
    };

    // 🔍 Check if currentUser exists in the group
    const userInGroup = newGroup.groupMembers.some(
      (m) => m.name === currentUser?.user?.username
    );

    if (!userInGroup) {
      const fallbackUser = newGroup.groupMembers[0];
      const updatedUser = {
        user: {
          username: fallbackUser.name,
          email: fallbackUser.email,
        },
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      console.log(`currentUser replaced by: ${fallbackUser.name}`);
    }



    onCreateGroup(newGroup);    // await it here!
    // onCreateGroupFooter(newGroup) ? window.location.href("/groups"):""


    setGroupName("");
    setCategory("");
    setDescription("");
    setMembers([
      { name: "", email: "" },
      { name: "", email: "" },
      { name: "", email: "" },
    ]);


  };


  useEffect(() => {
    if (currentUser) {
      const updatedMembers = [...members];
      updatedMembers[0] = {
        name: currentUser.user.username || "",
        email: currentUser.user.email || "",
      };
      setMembers(updatedMembers);
    }
  }, []);

  return (
    <>
      <div className="modal fade" id="createGroupModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleCreateGroup}>
              <div className="modal-header">
                <h5 className="modal-title">Create New Group</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Group Name</label>
                  <input type="text" className="form-control" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
                </div>

                {/* Members */}
                {members.map((member, i) => (
                  <div className="row g-2 mb-2" key={i}>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(i, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(i, "email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className="mb-3">
                  <button type="button" className="btn btn-link p-0" onClick={handleAddMember}>
                    + Add More Members
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select category</option>
                    <option>Trip</option>
                    <option>Party</option>
                    <option>Office</option>
                    <option>Others</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateGroupModal;
