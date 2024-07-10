import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const Dashboard = () => {
  const [data, setData] = useState({
    userDataCount: 0,
    testCount: 0,
    questionCount: 0
  });
  const [userExams, setUserExams] = useState([]);
  const [matchedExams, setMatchedExams] = useState([]);
  const userId = localStorage.getItem('loggedInUserId'); // Lấy userId từ localStorage
  const countUserEx = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDataResponse, testDataResponse, questionDataResponse] = await Promise.all([
          axios.get('http://localhost:9999/users'),
          axios.get('http://localhost:9999/exams'),
          axios.get('http://localhost:9999/questions')
        ]);

        console.log('Users:', userDataResponse.data);
        console.log('Tests:', testDataResponse.data);
        console.log('Questions:', questionDataResponse.data);

        setData({
          userDataCount: userDataResponse.data.length,
          testCount: testDataResponse.data.length,
          questionCount: questionDataResponse.data.length
        });

        // Lấy danh sách các bài thi được giao cho userId
        if (userId !== '1') { // Nếu không phải admin

          const response = await axios.get('http://localhost:9999/exams');
          const lstExam = response.data;
          const matched = [];
          for (const itemExam of lstExam) {
            const response = await axios.get(`http://localhost:9999/user_exam?id_exam=${itemExam.id}`);
            response.data.forEach(item => {
              if (item.id_user.includes(userId)) {
                matched.push(itemExam);
              }
            });
          }
          setMatchedExams(matched);
          console.log("Bài thi:", matched);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="dashboard">
      <div className="row">
        {userId === '1' ? (
          <>
            <div className="col">
              <div className="widget-stats">
                <div className="icon" style={{ color: 'blue' }}>
                  <i className="fas fa-users"></i>
                </div>
                <div className="value">{data.userDataCount}</div>
                <div className="title">THÀNH VIÊN</div>
                <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
              </div>
            </div>
            <div className="col">
              <div className="widget-stats">
                <div className="icon" style={{ color: 'green' }}>
                  <i className="fas fa-book"></i>
                </div>
                <div className="value">{data.testCount}</div>
                <div className="title">BÀI THI</div>
                <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
              </div>
            </div>
            <div className="col">
              <div className="widget-stats">
                <div className="icon" style={{ color: 'lightseagreen' }}>
                  <i className="far fa-question-circle"></i>
                </div>
                <div className="value">{data.questionCount}</div>
                <div className="title">CÂU HỎI</div>
                <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col">
              <div className="widget-stats">
                <div className="icon" style={{ color: 'green' }}>
                  <i className="fas fa-book"></i>
                </div>
                <div className="value">{matchedExams.length}</div>
                <div className="title">BÀI THI</div>
                <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
              </div>
            </div>
            <div className="col">
              <div className="widget-stats">
                <div className="icon" style={{ color: 'lightseagreen' }}>
                  <i className="far fa-question-circle"></i>
                </div>
                <div className="value">{data.questionCount}</div>
                <div className="title">CÂU HỎI</div>
                <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
