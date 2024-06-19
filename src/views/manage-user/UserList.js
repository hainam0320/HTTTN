import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Tooltip // Import Tooltip from reactstrap
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/style.css';

const UserList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tooltipOpen, setTooltipOpen] = useState({}); // State for managing Tooltip visibility
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulated data fetching (replace with actual API call)
    const usersData = [
      { id: 1, fullName: 'admin', username: 'admin', email: 'admin@example.com', status: true, dateCreated: '2024-06-17' },
      { id: 2, fullName: 'Jane Smith', username: 'jane.smith', email: 'jane.smith@example.com', status: false, dateCreated: '2024-06-16' },
      { id: 3, fullName: 'Alice Johnson', username: 'alice.johnson', email: 'alice.johnson@example.com', status: true, dateCreated: '2024-06-15' },
      { id: 4, fullName: 'Bob Brown', username: 'bob.brown', email: 'bob.brown@example.com', status: false, dateCreated: '2024-06-14' },
      { id: 5, fullName: 'Eve Wilson', username: 'eve.wilson', email: 'eve.wilson@example.com', status: true, dateCreated: '2024-06-13' },
      { id: 6, fullName: 'Michael Davis', username: 'michael.davis', email: 'michael.davis@example.com', status: false, dateCreated: '2024-06-12' },
      { id: 7, fullName: 'Sophia Garcia', username: 'sophia.garcia', email: 'sophia.garcia@example.com', status: true, dateCreated: '2024-06-11' },
      { id: 8, fullName: 'David Rodriguez', username: 'david.rodriguez', email: 'david.rodriguez@example.com', status: false, dateCreated: '2024-06-10' },
      { id: 9, fullName: 'Olivia Martinez', username: 'olivia.martinez', email: 'olivia.martinez@example.com', status: true, dateCreated: '2024-06-09' },
      { id: 10, fullName: 'William Hernandez', username: 'william.hernandez', email: 'william.hernandez@example.com', status: false, dateCreated: '2024-06-08' },
      { id: 11, fullName: 'Emma Lopez', username: 'emma.lopez', email: 'emma.lopez@example.com', status: true, dateCreated: '2024-06-07' },
    ];

    setUsers(usersData);
    setFilteredUsers(usersData); // Initialize filteredUsers with all users

    const totalPagesCount = Math.ceil(usersData.length / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, []);

  useEffect(() => {
    // Filter users based on searchKeyword and selectedStatus
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedStatus === '' || user.status === (selectedStatus === 'true'))
    );

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
    const totalPagesCount = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [searchKeyword, selectedStatus, users]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Triggered when search form is submitted
    // Will cause useEffect above to update filteredUsers
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const approveItem = (userId) => {
    // Logic to approve user with id = userId
    // For simulation, update status in users and filteredUsers
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: true } : user
    );
    setUsers(updatedUsers);
    const updatedFilteredUsers = filteredUsers.map(user =>
      user.id === userId ? { ...user, status: true } : user
    );
    setFilteredUsers(updatedFilteredUsers);
  };

  const unapproveItem = (userId) => {
    // Logic to unapprove user with id = userId
    // For simulation, update status in users and filteredUsers
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: false } : user
    );
    setUsers(updatedUsers);
    const updatedFilteredUsers = filteredUsers.map(user =>
      user.id === userId ? { ...user, status: false } : user
    );
    setFilteredUsers(updatedFilteredUsers);
  };

  const toggleTooltip = (tooltipId) => {
    setTooltipOpen(prevState => ({
      ...prevState,
      [tooltipId]: !prevState[tooltipId],
    }));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUserList = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <FontAwesomeIcon icon={faUser} /> Danh sách người dùng
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSearch}>
              <FormGroup row>
              <div className='col-6 d-flex align-items-center'>
                  <div >
                    <Label className="mb-0" for="keyword">Tìm kiếm</Label>
                  </div>

                  <Col className="pl-3" >
                    <Input
                      type="text"
                      id="keyword"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="Tên người dùng"
                    />
                  </Col>
                </div>
                <div className='col-6 d-flex align-items-center'>
                  <div className='mr-3 pading-right-3'>
                  <Label className="mb-0" for="status">Trạng thái</Label>
                  </div>

                  <Col className="pl-3" sm="5">
                  <Input
                    type="select"
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="true">Đã phê duyệt</option>
                    <option value="false">Chưa phê duyệt</option>
                  </Input>
                </Col>
                </div>
              </FormGroup>
              <Button color="primary" type="submit">Tìm kiếm</Button>
            </Form>
            <Table className="mt-4" bordered>
              <thead>
                <tr className="text-center">
                  <th>STT</th>
                  <th>Tên người dùng</th>
                  <th>Tài khoản</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUserList.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    <td>{startIndex + index + 1}</td>
                    <td>{user.fullName}</td>

                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.status ? 'Đã phê duyệt' : 'Chưa phê duyệt'}</td>
                    <td>{user.dateCreated}</td>
                    <td className="text-center">
                      {user.status ? (
                        <Button
                          color="danger"
                          id={`tooltipUnapprove${user.id}`}
                          onClick={() => unapproveItem(user.id)}
                          onMouseEnter={() => toggleTooltip(`tooltipUnapprove${user.id}`)}
                          onMouseLeave={() => toggleTooltip(`tooltipUnapprove${user.id}`)}
                        >
                          <FontAwesomeIcon icon={faUserTimes} className="text-white" />
                          <Tooltip
                            target={`tooltipUnapprove${user.id}`}
                            isOpen={tooltipOpen[`tooltipUnapprove${user.id}`]}
                            toggle={() => toggleTooltip(`tooltipUnapprove${user.id}`)}
                          >
                            Bỏ phê duyệt
                          </Tooltip>
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          id={`tooltipApprove${user.id}`}
                          onClick={() => approveItem(user.id)}
                          onMouseEnter={() => toggleTooltip(`tooltipApprove${user.id}`)}
                          onMouseLeave={() => toggleTooltip(`tooltipApprove${user.id}`)}
                        >
                          <FontAwesomeIcon icon={faUserPlus} className="text-white" />
                          <Tooltip
                            target={`tooltipApprove${user.id}`}
                            isOpen={tooltipOpen[`tooltipApprove${user.id}`]}
                            toggle={() => toggleTooltip(`tooltipApprove${user.id}`)}
                          >
                            Phê duyệt
                          </Tooltip>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col xs="12">
                <Pagination className="justify-content-center">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink previous onClick={prevPage} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index + 1} active={currentPage === index + 1}>
                      <PaginationLink onClick={() => changePage(index + 1)}>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink next onClick={nextPage} />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UserList;
