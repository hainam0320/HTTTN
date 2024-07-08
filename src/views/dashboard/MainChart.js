import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const StatisticsChart = () => {
  const [chartLoaded, setChartLoaded] = useState(true);
  const [chartData, setChartData] = useState({
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

  useEffect(() => {
    // Fetching data from the endpoints
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('http://localhost:9999/users');
        const examsResponse = await fetch('http://localhost:9999/exams');
        const users = await usersResponse.json();
        const exams = await examsResponse.json();
        
        // Process users data
        const approvedUsers = users.filter(user => user.status).length;
        const pendingUsers = users.filter(user => !user.status).length;
        
        // Process exams data
        const currentDate = new Date();
        const ongoingExams = exams.filter(exam => new Date(exam.time_end) >= currentDate).length;
        const expiredExams = exams.filter(exam => new Date(exam.time_end) < currentDate).length;
        
        // Update chart data
        setChartData({
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

  return (
    <div className="chart-section">
      <div className="chart-container">
        {chartLoaded && <Pie data={chartData} options={chartOptions} />}
        <h1>Thống kê tài khoản</h1>
      </div>
      <div style={{ marginTop: '30px' }} className="chart-container">
        {chartLoaded && <Pie data={completionChartData} options={chartOptions} />}
        <h1>Thống kê bài thi</h1>
      </div>
    </div>
  );
};

export default StatisticsChart;
