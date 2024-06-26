import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/style.css';

const Dashboard = () => {
  const [data, setData] = useState({
    userDataCount: 0,
    testCount: 0,
    questionCount: 0
  });

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="row">
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
      </div>
    </div>
  );
};

export default Dashboard;
