import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CWidgetStatsC,
  CSpinner,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faClock, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'; 

const DetailTestPage = () => {
  const { id } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/exams/${id}`);
        setTestDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching test details:', error);
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [id]);

  if (loading) {
    return (
      <CContainer>
        <CRow className="justify-content-center">
          <CSpinner color="primary" />
        </CRow>
      </CContainer>
    );
  }

  return (
    <CContainer>
      {testDetails ? (
        <CRow>
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faQuestionCircle} className="icon-green" size="lg" />}
              progress={{ color: 'success', value: 75 }}
              title="Số câu hỏi"
              value={testDetails.count_question}
            />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faClock} className="icon-blue" size="lg" />}
              progress={{ value: 75 }}
              title="Thời gian làm bài"
              value={`${testDetails.time_work} phút`}
            />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faCalendarAlt} className="icon-orange" size="lg" />}
              progress={{ value: 75 }}
              title="Thời gian bắt đầu"
              value={new Date(testDetails.time_start).toLocaleString()}
            />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faCalendarAlt} className="icon-red" size="lg" />}
              progress={{ value: 75 }}
              title="Thời gian kết thúc"
              value={new Date(testDetails.time_end).toLocaleString()}
            />
          </CCol>
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faUser} className="icon-blue" size="lg" />}
              progress={{ value: 75 }}
              title="Người giao bài"
              value="admin"
            />
          </CCol>
        </CRow>
      ) : (
        <CRow>
          <CCol xs="12">
            <p>Không tìm thấy thông tin chi tiết của bài thi.</p>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};

export default DetailTestPage;
