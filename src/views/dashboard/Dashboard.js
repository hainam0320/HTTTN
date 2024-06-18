import React from 'react';
import '../css/style.css';

const Dashboard = () => {
  // Fixed data
  const userDataCount = 8;
  const testCount = 5;
  const questionCount = 57;

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col">
          <div className="widget-stats">
            <div className="icon" style={{ color: 'blue' }}>
              <i className="fas fa-users"></i>
            </div>
            <div className="value">{userDataCount}</div>
            <div className="title">THÀNH VIÊN</div>
            <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
          </div>
        </div>
        <div className="col">
          <div className="widget-stats">
            <div className="icon" style={{ color: 'green' }}>
              <i className="fas fa-book"></i>
            </div>
            <div className="value">{testCount}</div>
            <div className="title">BÀI THI</div>
            <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
          </div>
        </div>
        <div className="col">
          <div className="widget-stats">
            <div className="icon" style={{ color: 'lightseagreen' }}>
              <i className="far fa-question-circle"></i>
            </div>
            <div className="value">{questionCount}</div>
            <div className="title">CÂU HỎI</div>
            <div className="progress-bar" style={{ backgroundColor: 'blue' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
