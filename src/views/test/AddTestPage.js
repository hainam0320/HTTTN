import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { CheckCircle } from 'react-bootstrap-icons';
import axios from 'axios';

const AddExam = () => {
    const [exam, setExam] = useState({
        name: '',
        count_question: '',
        time_work: '',
        time_start: '',
        time_end: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExam({
            ...exam,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!exam.name) newErrors.name = 'Tên bài thi không được để trống';
        if (!exam.count_question) newErrors.count_question = 'Số lượng câu hỏi không được để trống';
        if (!exam.time_work) newErrors.time_work = 'Thời gian làm bài không được để trống';
        if (!exam.time_start) newErrors.time_start = 'Thời gian bắt đầu không được để trống';
        if (!exam.time_end) newErrors.time_end = 'Thời gian kết thúc không được để trống';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitExam = async () => {
        if (validate()) {
            try {
                const response = await axios.get('http://localhost:9999/exams');
                const exams = response.data;
                const maxId = exams.length > 0 ? Math.max(...exams.map(exam => exam.id)) : 0;
                const newExam = {
                    ...exam,
                    id: (maxId + 1).toString(),
                };

                await axios.post('http://localhost:9999/exams', newExam);
                setMessage('Bài thi đã được lưu thành công');
                setExam({
                    name: '',
                    count_question: '',
                    time_work: '',
                    time_start: '',
                    time_end: ''
                });

                navigate('/test', { state: { refresh: true } }); // Điều hướng và yêu cầu làm mới danh sách bài thi
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
                setMessage('Có lỗi xảy ra khi lưu bài thi');
            }
        }
    };

    return (
        <Container fluid className="border bg-white">
            {message && (
                <Alert variant="success" className="d-flex align-items-center">
                    <CheckCircle className="flex-shrink-0 me-2" size={24} />
                    <div>{message}</div>
                </Alert>
            )}
            <h3 className="text-center mt-2">THÊM MỚI BÀI THI</h3>
            <hr />
            <Form>
                <Row>
                    <Col xs={12} md>
                        <Form.Group>
                            <Form.Label className="mb-1">Tên bài thi</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={exam.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="text-danger">{errors.name}</span>}
                        </Form.Group>
                    </Col>
                    <Col xs={12} md>
                        <Form.Group>
                            <Form.Label className="mb-1">Số lượng câu hỏi</Form.Label>
                            <Form.Control
                                type="number"
                                name="count_question"
                                value={exam.count_question}
                                onChange={handleChange}
                            />
                            {errors.count_question && <span className="text-danger">{errors.count_question}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col xs={12} md>
                        <Form.Group>
                            <Form.Label className="mb-1">Thời gian làm bài</Form.Label>
                            <Form.Control
                                type="number"
                                name="time_work"
                                value={exam.time_work}
                                onChange={handleChange}
                            />
                            {errors.time_work && <span className="text-danger">{errors.time_work}</span>}
                        </Form.Group>
                    </Col>
                    <Col xs={12} md>
                        <Form.Group>
                            <Form.Label className="mb-1">Thời gian bắt đầu</Form.Label>
                            <Form.Control
                                type="date"
                                name="time_start"
                                value={exam.time_start}
                                onChange={handleChange}
                            />
                            {errors.time_start && <span className="text-danger">{errors.time_start}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2 mb-4">
                    <Col xs={12} md={6}>
                        <Form.Group>
                            <Form.Label className="mb-1">Thời gian kết thúc</Form.Label>
                            <Form.Control
                                type="date"
                                name="time_end"
                                value={exam.time_end}
                                onChange={handleChange}
                            />
                            {errors.time_end && <span className="text-danger">{errors.time_end}</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <hr />
                <Row className="mt-4 mb-3">
                    <Col xs={12} className="d-flex justify-content-end">
                        <Button variant="warning" onClick={() => navigate('/test')}>
                            <span className="text-white">Quay lại</span>
                        </Button>
                        <p className="p-1"></p>
                        <Button variant="primary" onClick={submitExam}>Lưu lại</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default AddExam;
