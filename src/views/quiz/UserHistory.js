import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination } from 'react-bootstrap';

const UserHistoryPage = () => {
  const [userResults, setUserResults] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Số bản ghi trên mỗi trang, có thể điều chỉnh
  const userId = localStorage.getItem('loggedInUserId'); // Lấy userId từ localStorage

  useEffect(() => {
    const fetchUserResults = async () => {
      try {
        let response;
        if (userId == 1) {
          // Nếu là admin, lấy tất cả kết quả
          response = await axios.get('http://localhost:9999/user_result');
        } else {
          // Nếu không phải admin, lấy kết quả của người dùng hiện tại
          response = await axios.get(`http://localhost:9999/user_result?user_id=${userId}`);
        }
        setUserResults(response.data);
      } catch (error) {
        console.error('Error fetching user results:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9999/users');
        const users = response.data;
        const userMap = users.reduce((map, user) => {
          map[user.id] = user.username; 
          return map;
        }, {});
        setUserMap(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserResults();
    fetchUsers();
  }, [userId]);

  const totalPages = Math.ceil(userResults.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = userResults.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-5">
      <h2>{userId == 1 ? 'Lịch sử làm bài của tất cả người dùng' : 'Lịch sử làm bài của bạn'}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên bài thi</th>
            <th>Thời gian làm bài</th>
            <th>Kết quả (%)</th>
            {userId == 1 && <th>Người làm bài</th>} {/* Thêm cột Người làm bài nếu là admin */}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((result, index) => (
            <tr key={result.id}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{result.test_name}</td>
              <td>{new Date(result.time_test).toLocaleString()}</td>
              <td>{result.result}</td>
              {userId == 1 && <td>{userMap[result.user_id]}</td>} {/* Hiển thị tên người làm bài nếu là admin */}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default UserHistoryPage;
