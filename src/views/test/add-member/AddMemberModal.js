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
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/users'); // Adjust the endpoint to match your API
                const users = response.data.map(user => ({
                    label: user.fullName,
                    value: user.id
                }));
                setUserList(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Users:', selectedUsers);
        closeModal();
    };

    return (
        <CModal size="xl" visible={visible} onClose={closeModal} aria-labelledby="AddMemberModal">
            <CForm onSubmit={handleSubmit}>
                <CModalHeader>
                    <CModalTitle id="AddMemberModal" className="mb-2">Thêm thành viên vào bài thi</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <label className="typo__label mb-2">Thêm thành viên</label>
                        <Select
                            isMulti
                            options={userList}
                            value={selectedUsers}
                            onChange={setSelectedUsers}
                            placeholder="Gõ để tìm kiếm"
                        />
                    </div>
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={closeModal}>
                        Đóng
                    </CButton>

                    <CButton color="primary" type="submit">Lưu</CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
};

export default AddMemberModal;
