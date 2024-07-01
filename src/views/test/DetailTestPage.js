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
import { faQuestionCircle, faClock, faCalendarAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const DetailTestPage = () => {
  const { id } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const [testResponse, membersResponse] = await Promise.all([
          axios.get(`http://localhost:9999/exams/${id}`),
          axios.get(`http://localhost:9999/user_exam?id_exam=${id}`)
        ]);

        setTestDetails(testResponse.data);

        // Đếm tổng số lượng thành viên từ các bản ghi `user_exam`
        const totalMembers = membersResponse.data.reduce((acc, userExam) => acc + userExam.id_user.length, 0);
        setMemberCount(totalMembers);

        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài thi hoặc thành viên:', error);
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
          <CCol xs={4}>
            <CWidgetStatsC
              className="mb-3"
              icon={<FontAwesomeIcon icon={faUsers} className="icon-blue" size="lg" />}
              progress={{ value: 75 }}
              title="Số lượng thành viên"
              value={memberCount}
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
