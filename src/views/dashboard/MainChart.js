import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardHeader, Col, Row } from 'reactstrap';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const getLoggedInUserId = () => {
  return localStorage.getItem('loggedInUserId');
};
const userId = getLoggedInUserId();

const StatisticsChart = () => {
  const [chartLoaded, setChartLoaded] = useState(true);
  const [userChartData, setUserChartData] = useState({
    labels: ['Đã phê duyệt', 'Chưa phê duyệt'],
    datasets: [
      {
        label: 'Members',
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        data: [0, 0], // Dynamic data
      },
    ],
  });

  const [completionChartData, setCompletionChartData] = useState({
    labels: ['Đang thực hiện', 'Đã hết hạn'],
    datasets: [
      {
        label: 'Exams',
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        data: [0, 0], // Dynamic data
      },
    ],
  });

  const [scoreChartData, setScoreChartData] = useState({
    labels: ['<50%', '50%-70%', '70%-90%', '>90%'],
    datasets: [
      {
        label: 'Scores',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        data: [0, 0, 0, 0], // Dynamic data
      },
    ],
  });

  useEffect(() => {
    // Fetching data from the endpoints
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:9999/users');
        const examsResponse = await fetch('http://localhost:9999/exams');
        const scoresResponse = await fetch('http://localhost:9999/user_result');
        const users = await usersResponse.json();
        const exams = await examsResponse.json();
        const scores = await scoresResponse.json();

        // Process users data
        const approvedUsers = users.filter(user => user.status).length;
        const pendingUsers = users.filter(user => !user.status).length;

        // Process exams data
        const currentDate = new Date();
        const ongoingExams = exams.filter(exam => new Date(exam.time_end) >= currentDate).length;
        const expiredExams = exams.filter(exam => new Date(exam.time_end) < currentDate).length;

        // Process scores data
        const scoreRanges = [0, 0, 0, 0];
        scores.forEach(score => {
          if (score.result < 50) {
            scoreRanges[0]++;
          } else if (score.result >= 50 && score.result < 70) {
            scoreRanges[1]++;
          } else if (score.result >= 70 && score.result < 90) {
            scoreRanges[2]++;
          } else {
            scoreRanges[3]++;
          }
        });

        // Update chart data
        setUserChartData({
          labels: ['Đã phê duyệt', 'Chưa phê duyệt'],
          datasets: [
            {
              label: 'Members',
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              data: [approvedUsers, pendingUsers],
            },
          ],
        });

        setCompletionChartData({
          labels: ['Đang thực hiện', 'Đã hết hạn'],
          datasets: [
            {
              label: 'Exams',
              backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              data: [ongoingExams, expiredExams],
            },
          ],
        });

        setScoreChartData({
          labels: ['<50%', '50%-70%', '70%-90%', '>90%'],
          datasets: [
            {
              label: 'Scores',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              data: scoreRanges,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  if (userId == 1) {
    return (
      <div className="chart-section">
        <div className="chart-container">
          {chartLoaded && <Pie data={userChartData} options={chartOptions} />}
          <h1>Thống kê tài khoản</h1>
        </div>
        <div style={{ marginTop: '30px' }} className="chart-container">
          {chartLoaded && <Pie data={completionChartData} options={chartOptions} />}
          <h1>Thống kê bài thi</h1>
        </div>
        <div style={{ marginTop: '30px' }} className="chart-container">
          {chartLoaded && <Pie data={scoreChartData} options={chartOptions} />}
          <h1>Thống kê điểm thi</h1>
        </div>
      </div>
    );
  } else {
    return (
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h5 className="text-center">Không tìm thấy thông tin</h5>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default StatisticsChart;
