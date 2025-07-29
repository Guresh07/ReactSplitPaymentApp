import React, { useEffect, useState } from 'react';
// import React from 'react';
import Header from '../components/Header';
import CreateGroupModal from '../components/Group/CreateGroupModal';
import GroupList from '../components/Group/GroupList';
import RecentActivity from '../components/Group/RecentActivity';
import Footer from '../components/Footer';
import axios from 'axios';
import { getData } from '../utils/storage';
import { addGroup, deleteGroup, getGroups } from '../components/Apis/Api';




function Groups() {


    const [groups, setGroups] = useState([]);
    const [expenses, setExpenses] = useState();
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(`${getGroups}`);
            setGroups(response.data.reverse());
            console.log(response.data)
            setLoading(false)
        } catch (err) {
            console.error("Error fetching group:", err);
            setLoading(false);
        }
    };

    const currentUser = getData("currentUser")

    const handleCreateGroup = async (newGroup) => {
        try {
            const response = await axios.post(
                `${addGroup}`, newGroup);
            console.log("Group created:", response.data);

            fetchGroups(); // ensure it's awaited


        } catch (err) {
            console.error("Error creating group:", err);
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            await axios.delete(`${deleteGroup}/${groupId}`);
            console.log("Group deleted:", groupId);

            // Update local state without re-fetching
            setGroups((prevGroups) => prevGroups.filter((group) => group.groupId !== groupId));

        } catch (err) {
            console.error("Error deleting group:", err);
        }
    };


    useEffect(() => {
        fetchGroups();
    }, [])

    if (loading) return <div className="text-center mt-5 vh-100 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status"></div>
    </div>;
    return (
        <>

            <div className="container position-relative">
                <Header />
                <section className="rounded px-md-4 py-3" style={{ backgroundColor: "#f0f8ff" }}>
                    <CreateGroupModal onCreateGroup={handleCreateGroup} />
                    <GroupList groups={groups} onDeleteGroup={handleDeleteGroup} currentUser={currentUser.userData.userName} />
                    <RecentActivity groups={groups} />
                </section>
                <Footer onCreateGroupFooter={handleCreateGroup} />
            </div>

        </>
    )
}

export default Groups
