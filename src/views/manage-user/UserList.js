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
  Tooltip
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
  const [tooltipOpen, setTooltipOpen] = useState({});

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9999/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);

        const totalPagesCount = Math.ceil(data.length / itemsPerPage);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedStatus === '' || user.status === (selectedStatus === 'true'))
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
    const totalPagesCount = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPagesCount);
  }, [searchKeyword, selectedStatus, users]);

  const handleSearch = (e) => {
    e.preventDefault();
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

  const updateUserStatus = (userId, status) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status } : user
    );
    setUsers(updatedUsers);

    const filtered = updatedUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      (selectedStatus === '' || user.status === (selectedStatus === 'true'))
    );

    setFilteredUsers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  };

  const approveItem = (userId) => {
    updateUserStatus(userId, true);
  };

  const unapproveItem = (userId) => {
    updateUserStatus(userId, false);
  };

  const toggleTooltip = (id) => {
    setTooltipOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id]
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
                  <div>
                    <Label className="mb-0" for="keyword">Tìm kiếm</Label>
                  </div>
                  <Col className="pl-3">
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
                        <>
                          <Button
                            id={`unapprove-${user.id}`}
                            color="danger"
                            onClick={() => unapproveItem(user.id)}
                          >
                            <FontAwesomeIcon icon={faUserTimes} className="text-white" />
                          </Button>
                          {tooltipOpen[`unapprove-${user.id}`] && (
                            <Tooltip
                              placement="top"
                              content='Đã phê duyệt'
                              isOpen={tooltipOpen[`unapprove-${user.id}`]}
                              target={`unapprove-${user.id}`}
                              toggle={() => toggleTooltip(`unapprove-${user.id}`)}
                            >                           
                            </Tooltip>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            id={`approve-${user.id}`}
                            color="success"
                            onClick={() => approveItem(user.id)}
                          >
                            <FontAwesomeIcon icon={faUserPlus} className="text-white" />
                          </Button>
                          {tooltipOpen[`approve-${user.id}`] && (
                            <Tooltip
                              placement="top"
                              content='Chưa phê duyệt'
                              isOpen={tooltipOpen[`approve-${user.id}`]}
                              target={`approve-${user.id}`}
                              toggle={() => toggleTooltip(`approve-${user.id}`)}
                            >
                            </Tooltip>
                          )}
                        </>
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
