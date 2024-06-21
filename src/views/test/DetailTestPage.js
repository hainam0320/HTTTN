import React from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal
} from 'react-bootstrap';

const TestInformation = ({ visible, closeModal, test }) => {
  const handleClose = () => closeModal();

  if (!test) {
    return null;
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Xem
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>THÔNG TIN BÀI THI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="border bg-white" fluid>
            <h3 className="text-center mt-2">THÔNG TIN BÀI THI</h3>
            <hr />
            <Row className="mt-3">
              <Col xs="6" sm="4" lg="3">
                {/* Sử dụng WidgetStatsC và truyền các props tương ứng */}
                <WidgetStatsC value={users.length > 0 ? users.length : 0} progress={{ color: 'info', value: 100 }}>
                  <i className="fas fa-users" style={{ fontSize: '40px', color: 'blue' }}></i>
                  <div>Số thành viên</div>
                </WidgetStatsC>
              </Col>
              <Col xs="6" sm="4" lg="3">
                <WidgetStatsC value={test.count_question} progress={{ color: 'info', value: 100 }}>
                  <i className="far fa-question-circle" style={{ fontSize: '40px', color: 'green' }}></i>
                  <div>Số lượng câu hỏi</div>
                </WidgetStatsC>
              </Col>
              <Col xs="6" sm="4" lg="3">
                <WidgetStatsC value={test.time_work} progress={{ color: 'info', value: 100 }}>
                  <i className="far fa-clock" style={{ fontSize: '40px', color: 'deepskyblue' }}></i>
                  <div>Thời gian làm</div>
                </WidgetStatsC>
              </Col>
              <Col xs="6" sm="4" lg="3">
                <WidgetStatsC value={test.time_start} progress={{ color: 'info', value: 100 }}>
                  <i className="fas fa-hourglass-start" style={{ fontSize: '40px', color: 'chocolate' }}></i>
                  <div>Thời gian bắt đầu</div>
                </WidgetStatsC>
              </Col>
              <Col xs="6" sm="4" lg="3">
                <WidgetStatsC value={test.time_end} progress={{ color: 'info', value: 100 }}>
                  <i className="fa fa-hourglass-end" style={{ fontSize: '36px', color: 'red' }}></i>
                  <div>Thời gian kết thúc</div>
                </WidgetStatsC>
              </Col>
            </Row>
            <hr />
            <Row className="mt-3 mb-3">
              <Col xs={12} sm={6}>
                <h4>DANH SÁCH THÀNH VIÊN</h4>
                <ListGroup>
                  {users.map((user, index) => (
                    <ListGroupItem key={index}>
                      {/* Kiểm tra user và user.fullName trước khi hiển thị */}
                      {user.user && <b>{user.user.fullName}</b>}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} sm={6}>
                <h4 className="mobile-margin-top">DANH SÁCH HOÀN THÀNH</h4>
                <ListGroup>
                  {users.map((user, index) => (
                    user.result != null && (
                      <ListGroupItem key={index}>
                        {/* Kiểm tra user và user.user trước khi hiển thị */}
                        {user.user && (
                          <>
                            <b>{user.user.fullName}</b> - Kết quả thi: {user.result} - Thời gian làm: {user.user.time_work_display}
                          </>
                        )}
                      </ListGroupItem>
                    )
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestInformation;


