import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CContainer,
    CRow,
    CCol,
    CCallout,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormInput,
    CTooltip
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const TestList = () => {
    const [tabPaneActiveKey, setTabPaneActiveKey] = useState(1);
    const [lstTestUser, setLstTestUser] = useState([]);
    const [myTests, setMyTests] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTestId, setCurrentTestId] = useState(null);
    const [modalDeleteTest, setModalDeleteTest] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;
    const navigate = useNavigate();

    const changeTab = (key) => {
        setTabPaneActiveKey(key);
        // Điều hướng đến đường dẫn tương ứng khi click vào tab
        if (key === 1) {
            navigate('/test'); // Đường dẫn tương ứng với tab 1
        } else if (key === 2) {
            navigate('/my-tests'); // Đường dẫn tương ứng với tab 2
        }
    };

    const openAddMemberModal = (testId) => {
        setCurrentTestId(testId);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const openDeleteModal = (testId) => {
        setCurrentTestId(testId);
        setModalDeleteTest(true);
    };

    const deleteTest = () => {
        // delete test logic here
        setModalDeleteTest(false);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // Dữ liệu cố định (mock data)
        const mockData = [
            {
                id: 1,
                name: 'Bài thi 1',
                count_question: 10,
                time_work: 30,
                time_start: '2024-06-20T09:00:00',
                time_end: '2024-06-20T12:00:00',
                creator: 'Người tạo 1',
                result: null,
            },
            {
                id: 2,
                name: 'Bài thi 2',
                count_question: 15,
                time_work: 45,
                time_start: '2024-06-21T10:00:00',
                time_end: '2024-06-21T13:00:00',
                creator: 'Người tạo 2',
                result: null,
            },
        ];

        const myTestsData = [
            {
                id: 3,
                name: 'Bài thi của tôi 1',
                count_question: 20,
                time_work: 60,
                time_start: '2024-06-22T09:00:00',
                time_end: '2024-06-22T12:00:00',
                creator: 'Tôi',
                result: 'A',
            },
            {
                id: 4,
                name: 'Bài thi của tôi 2',
                count_question: 25,
                time_work: 75,
                time_start: '2024-06-23T10:00:00',
                time_end: '2024-06-23T13:00:00',
                creator: 'Tôi',
                result: 'B',
            },
        ];

        setLstTestUser(mockData);
        setMyTests(myTestsData);
    }, []);

    const filteredMyTests = myTests.filter((test) =>
        test.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const paginatedTestList = lstTestUser.slice(
        (currentPage - 1) * 10,
        currentPage * 10
    ); // example pagination logic

    return (
        <div>
            <CNav variant="tabs" role="tablist">
                <CNavItem>
                    <CNavLink
                        active={tabPaneActiveKey === 1}
                        onClick={() => changeTab(1)}
                    >
                        Bài thi
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink
                        active={tabPaneActiveKey === 2}
                        onClick={() => changeTab(2)}
                    >
                        Bài thi của tôi
                    </CNavLink>
                </CNavItem>
            </CNav>

            <CTabContent>
                <CTabPane visible={tabPaneActiveKey === 1}>
                    <CContainer className="bg-white mb-3 custom-borders" fluid>
                        <h3 className="text-center pt-3">DANH SÁCH BÀI THI CẦN LÀM</h3>
                        <hr />
                        <CRow>
                            {lstTestUser.map((test) => (
                                <CCol key={test.id} xs="12" sm="12" md="6">
                                    <CCallout color="success custom-callout">
                                        <div>
                                            <h4 className="text-uppercase">{test.name}</h4>
                                            <span>Số câu hỏi: {test.count_question}</span>
                                            <br />
                                            <span>Thời gian làm bài: {test.time_work} phút</span>
                                            <br />
                                            <span>Người giao bài: {test.creator}</span>
                                        </div>
                                        <div className="mt-md-0">
                                            {test.result == null ? (
                                                new Date(test.time_end) > new Date() ? (
                                                    <CButton
                                                        color="primary"
                                                        onClick={() => navigate(`/test/quiz/${test.id}/${test.count_question}/${test.time_work}`)}
                                                    >
                                                        <i className="fas fa-book-reader"></i> Làm bài
                                                    </CButton>
                                                ) : (
                                                    <CButton color="danger" className="text-white" disabled>
                                                        <i className="fas fa-exclamation-triangle"></i> Quá hạn
                                                    </CButton>
                                                )
                                            ) : (
                                                <CButton
                                                    color="success"
                                                    onClick={() => navigate(`/test/quiz/result/${test.id}`)}
                                                    className="text-white"
                                                >
                                                    <i className="fas fa-check"></i> Hoàn thành
                                                </CButton>
                                            )}
                                        </div>
                                    </CCallout>
                                </CCol>
                            ))}
                        </CRow>
                    </CContainer>
                </CTabPane>

                <CTabPane visible={tabPaneActiveKey === 2}>
                    <CContainer className="bg-white mb-3 custom-borders" fluid>
                        <h3 className="text-center pt-3">DANH SÁCH BÀI THI</h3>
                        <hr />
                        <CRow className="align-items-end justify-content-end">
                            <CCol xs="12" md="4">
                                <label className="mb-1">Tên bài thi</label>
                                <CFormInput
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    placeholder="Nhập tên bài thi"
                                />
                            </CCol>
                            <CCol xs="12" md="4">
                                <label className="mb-1">Tên người tạo</label>
                                <CFormInput placeholder="Nhập tên người tạo bài" />
                            </CCol>
                            <CCol xs="12" md="4" className="mt-md-0">
                                <div className="d-flex justify-content-center">
                                    <CButton color="primary" size="sm">Tìm kiếm</CButton>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow className="mt-4">
                            <CCol xs="9">
                                <CButton
                                    color="primary"
                                    className="text-white"
                                    onClick={() => navigate('/test/create')}
                                >
                                    Thêm mới
                                </CButton>
                            </CCol>
                        </CRow>
                        <div className="table-responsive">
                            <CTable className="mt-4 table-fixed" bordered borderColor="primary">
                                <CTableHead>
                                    <CTableRow className="text-center">
                                        <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className="fixed-width">Tên</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Số câu hỏi</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Thời gian làm</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Thời gian bắt đầu</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Hạn kết thúc</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className="fixed-width">Thao tác</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {filteredMyTests.map((test, index) => (
                                        <CTableRow key={test.id} className="text-center">
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell className="text-left">{test.name}</CTableDataCell>
                                            <CTableDataCell>{test.count_question}</CTableDataCell>
                                            <CTableDataCell>{test.time_work} phút</CTableDataCell>
                                            <CTableDataCell>{new Date(test.time_start).toLocaleString()}</CTableDataCell>
                                            <CTableDataCell>{new Date(test.time_end).toLocaleString()}</CTableDataCell>
                                            <CTableDataCell className="d-flex justify-content-between">
                                                <CTooltip content="Thêm thành viên" placement="top">
                                                    <CButton
                                                        color="primary"
                                                        size="sm"
                                                        onClick={() => openAddMemberModal(test.id)}
                                                        className="text-white"
                                                    >
                                                        <i className="fas fa-user-plus"></i>
                                                    </CButton>
                                                </CTooltip>
                                                <CTooltip content="Thêm câu hỏi" placement="top">
                                                    <CButton
                                                        color="info"
                                                        size="sm"
                                                        onClick={() => navigate(`/management/questions/create/${test.id}`)}
                                                        className="text-white"
                                                    >
                                                        <i className="fas fa-book-medical"></i>
                                                    </CButton>
                                                </CTooltip>
                                                <CTooltip content="Xem" placement="top">
                                                    <CButton
                                                        color="success"
                                                        size="sm"
                                                        onClick={() => navigate(`/test/detail/${test.id}`)}
                                                        className="text-white"
                                                    >
                                                        <i className="far fa-eye"></i>
                                                    </CButton>
                                                </CTooltip>
                                                <CTooltip content="Sửa" placement="top">
                                                    <CButton
                                                        color="warning"
                                                        size="sm"
                                                        onClick={() => navigate(`/test/edit/${test.id}`)}
                                                        className="text-white"
                                                    >
                                                        <i className="far fa-edit"></i>
                                                    </CButton>
                                                </CTooltip>
                                                <CTooltip content="Xóa" placement="top">
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => openDeleteModal(test.id)}
                                                        className="text-white"
                                                    >
                                                        <i className="far fa-trash-alt"></i>
                                                    </CButton>
                                                </CTooltip>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                            {/* Modal */}
                            <CModal
                                visible={modalDeleteTest}
                                onClose={() => setModalDeleteTest(false)}
                                aria-labelledby="LiveDemoExampleLabel"
                            >
                                <CModalHeader closeButton>
                                    <CModalTitle id="LiveDemoExampleLabel">Xóa bài thi</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    Bạn có chắc chắn muốn xóa bài thi này không?
                                </CModalBody>
                                <CModalFooter>
                                    <CButton
                                        color="secondary"
                                        onClick={() => setModalDeleteTest(false)}
                                    >
                                        Quay lại
                                    </CButton>
                                    <CButton
                                        color="primary"
                                        onClick={deleteTest}
                                    >
                                        Xác nhận
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </div>

                        {/* Pagination */}
                        <CRow>
                            <CCol xs="12">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                        >
                                            Trước
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => changePage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={nextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Tiếp
                                        </button>
                                    </li>
                                </ul>
                            </CCol>
                        </CRow>
                    </CContainer>
                </CTabPane>

            </CTabContent>
        </div>
    );
};

export default TestList;
