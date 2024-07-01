import React, { useState, useEffect } from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CForm
} from '@coreui/react';
import Select from 'react-select';
import axios from 'axios';

const AddMemberModal = ({ visible, closeModal, testId }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user list
                const usersResponse = await axios.get('http://localhost:9999/users');
                const users = usersResponse.data.map(user => ({
                    label: user.fullName,
                    value: user.id
                }));
                setUserList(users);

                // Fetch selected users for the test
                const addedUsersResponse = await axios.get(`http://localhost:9999/user_exam?id_exam=${testId}`);
                const addedUsers = addedUsersResponse.data.flatMap(userExam => 
                    userExam.id_user.map(id => {
                        const foundUser = users.find(user => user.value === id);
                        return foundUser ? { label: foundUser.label, value: foundUser.value } : null;
                    })
                ).filter(user => user !== null);
                setSelectedUsers(addedUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (visible) {
            fetchData();
        }
    }, [visible, testId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Extract ids of selected users
            const userIds = selectedUsers.map(user => user.value);
            
            // Check if the test id exists in the database
            const existingRecordResponse = await axios.get(`http://localhost:9999/user_exam?id_exam=${testId}`);
            const existingRecord = existingRecordResponse.data[0];

            if (existingRecord) {
                // If test id exists, update the record with selected user ids
                const updatedRecord = {
                    ...existingRecord,
                    id_user: userIds
                };
                await axios.put(`http://localhost:9999/user_exam/${existingRecord.id}`, updatedRecord);
                console.log('Member update successful:', updatedRecord);
            } else {
                // If test id does not exist, create a new record with selected user ids
                await axios.post('http://localhost:9999/user_exam', {
                    id_user: userIds,
                    id_exam: testId
                });
                console.log('Member addition successful:', selectedUsers);
            }

            closeModal();
        } catch (error) {
            console.error('Error adding/updating members:', error);
        }
    };

    return (
        <CModal visible={visible} onClose={closeModal} aria-labelledby="AddMemberModal">
            <CForm onSubmit={handleSubmit}>
                <CModalHeader closeButton>
                    <CModalTitle id="AddMemberModal" className="mb-2">Add members to the test</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <label className="typo__label mb-2">Select members</label>
                        <Select
                            isMulti
                            options={userList}
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                            placeholder="Type to search"
                        />
                    </div>
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                        Close
                    </CButton>

                    <CButton color="primary" type="submit">Save</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default AddMemberModal;
