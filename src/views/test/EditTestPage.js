import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  CAlert,
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CButton,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const EditExam = () => {
  const { id } = useParams();
  const [exam, setExam] = useState({
    name: '',
    count_question: 0,
    time_work: 0,
    time_start: '',
    time_end: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading status

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/exams/${id}`);
        const fetchedExam = response.data;

        // Update exam state with fetched data
        setExam({
          name: fetchedExam.name || '',
          count_question: fetchedExam.count_question || 0,
          time_work: fetchedExam.time_work || 0,
          time_start: fetchedExam.time_start || '',
          time_end: fetchedExam.time_end || '',
        });

        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching exam details:', error);
        setLoading(false); // Mark loading as complete even on error
      }
    };

    fetchExamDetails();
  }, [id]); // Run effect whenever id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExam({
      ...exam,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!exam.name) {
      errors.name = 'Tên bài thi không được để trống';
      isValid = false;
    }

    if (!exam.count_question) {
      errors.count_question = 'Số lượng câu hỏi không được để trống';
      isValid = false;
    }

    if (!exam.time_work) {
      errors.time_work = 'Thời gian làm bài không được để trống';
      isValid = false;
    }

    if (!exam.time_start) {
      errors.time_start = 'Thời gian bắt đầu không được để trống';
      isValid = false;
    }

    if (!exam.time_end) {
      errors.time_end = 'Thời gian kết thúc không được để trống';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const submitExam = () => {
    if (validate()) {
      // Assume you would submit exam data here, e.g., send to server
      // For demonstration, just show a success message
      setMessage('Bài thi đã được cập nhật thành công');
      // Redirect to test page after a short delay
      setTimeout(() => {
        navigate('/test');
      }, 2000);
    }
  };

  if (loading) {
    return (
      <CContainer>
        <CRow className="justify-content-center">
          <CAlert color="info">
            Đang tải dữ liệu bài thi...
          </CAlert>
        </CRow>
      </CContainer>
    );
  }

  return (
    <div>
      {message && (
        <CAlert color="success" className="d-flex align-items-center">
          <i className="cil-check-circle flex-shrink-0 me-2" style={{ width: '24px', height: '24px' }} />
          <div>{message}</div>
        </CAlert>
      )}
      <CContainer className="border bg-white" fluid>
        <h3 className="text-center mt-2">SỬA BÀI THI</h3>
        <hr />
        <CRow>
          <CCol xs="12" md>
            <label className="mb-1" htmlFor="name">Tên bài thi</label>
            <CFormInput
              type="text"
              id="name"
              name="name"
              value={exam.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </CCol>
          <CCol xs="12" md>
            <label className="mb-1" htmlFor="count_question">Số lượng câu hỏi</label>
            <CFormInput
              type="number"
              id="count_question"
              name="count_question"
              value={exam.count_question}
              onChange={handleChange}
            />
            {errors.count_question && <span className="text-danger">{errors.count_question}</span>}
          </CCol>
        </CRow>
        <CRow className="mt-2">
          <CCol xs="12" md>
            <label className="mb-1" htmlFor="time_work">Thời gian làm bài</label>
            <CFormInput
              type="number"
              id="time_work"
              name="time_work"
              value={exam.time_work}
              onChange={handleChange}
            />
            {errors.time_work && <span className="text-danger">{errors.time_work}</span>}
          </CCol>
          <CCol xs="12" md>
            <label className="mb-1" htmlFor="time_start">Thời gian bắt đầu</label>
            <CFormInput
              type="date"
              id="time_start"
              name="time_start"
              value={exam.time_start}
              onChange={handleChange}
            />
            {errors.time_start && <span className="text-danger">{errors.time_start}</span>}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-4">
          <CCol xs="12" md>
            <label className="mb-1" htmlFor="time_end">Thời gian kết thúc</label>
            <CFormInput
              type="date"
              id="time_end"
              name="time_end"
              value={exam.time_end}
              onChange={handleChange}
            />
            {errors.time_end && <span className="text-danger">{errors.time_end}</span>}
          </CCol>
        </CRow>
        <hr />
        <CRow className="mt-4 mb-3">
          <CCol xs="12" className="d-flex justify-content-end">
            <CButton color="warning" onClick={() => navigate('/test')}>
              Quay lại
            </CButton>
            <p className="p-1"></p>
            <CButton color="primary" onClick={submitExam}>
              Lưu lại
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default EditExam;
