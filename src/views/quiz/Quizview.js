import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Col, Button, Card, ListGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CCallout } from '@coreui/react';

const QuizView = () => {
  const [name, setName] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0); // Initialize to 0, will set from API
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctPercentage, setCorrectPercentage] = useState(0);
  const [timeUp, setTimeUp] = useState(false); // State to track if time is up
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/questions?test_id=${id}`);
        const data = response.data;
        const questions = data.filter(question => question.test_id === id);
        const examResponse = await axios.get(`http://localhost:9999/exams/${id}`);
        const examData = examResponse.data;
        
        setQuestionList(questions);
        setTimeLeft(examData.time_work * 60); 
        setName(examData.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setTimeUp(true); 
          handleSubmit(); 
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId, choiceId) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctAnswersCount = 0;
    questionList.forEach(question => {
      if (userAnswers[question.id] === question.correct_choice_id) {
        correctAnswersCount++;
      }
    });
    const percentage = (correctAnswersCount / questionList.length) * 100;
    setCorrectPercentage(percentage.toFixed(2)); 
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!questionList || questionList.length === 0) {
    return <div className='text-danger'>Chưa có dữ liệu</div>;
  }

  return (
    <Container fluid className="border bg-white psr">
      <h3 className="text-center mt-2 text-uppercase">BÀI THI {name}</h3>
      <hr />
      {!submitted && !timeUp && (
        <div className="text-center mb-3">
          <h4>Thời gian còn lại: {formatTime(timeLeft)}</h4>
        </div>
      )}
      {questionList.map((question, index) => (
        <Col xs="12" key={question.id}>
          <CCallout color={index % 2 === 0 ? 'success' : 'info'} text="white" className="mb-3">
            <Card.Body>
              <Card.Title><b>{`Câu ${index + 1}: ${question.name}`}</b></Card.Title>
              <ListGroup>
                {question.choices.map(choice => (
                  <ListGroup.Item key={choice.id} className="list-group-item">
                    <Form.Check
                      type={question.count_answer > 1 ? 'checkbox' : 'radio'}
                      id={`${question.id}-${choice.id}`}
                      name={`${question.id}-answers`}
                      label={choice.content}
                      value={choice.id}
                      disabled={submitted || timeUp} 
                      checked={userAnswers[question.id] === choice.id}
                      onChange={() => handleAnswerChange(question.id, choice.id)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </CCallout>
        </Col>
      ))}
      {!submitted && !timeUp && (
        <Col xs="12" className="text-center mb-2">
          <Button variant="primary" className="mt-3" onClick={handleSubmit}>Nộp bài</Button>
        </Col>
      )}
      {submitted && (
        <Col xs="12" className="text-center mb-2">
          <h4>Kết quả bài thi:</h4>
          <h5>Phần trăm câu đúng: {correctPercentage}%</h5>
          {questionList.map((question, index) => (
            <CCallout color={index % 2 === 0 ? 'success' : 'info'} text="white" className="mb-3" key={question.id}>
              <Card.Body>
                <Card.Title><b>{`Câu ${index + 1}: ${question.name}`}</b></Card.Title>
                <ListGroup>
                  {question.choices.map(choice => (
                    <ListGroup.Item key={choice.id} className={`list-group-item ${choice.id === question.correct_choice_id ? 'bg-success text-white' : ''}`}>
                      <Form.Check
                        type="radio"
                        id={`${question.id}-${choice.id}`}
                        name={`${question.id}-answers`}
                        label={choice.content}
                        value={choice.id}
                        checked={userAnswers[question.id] === choice.id}
                        disabled
                      />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                {userAnswers[question.id] === question.correct_choice_id ? (
                  <div className=" text-success">Correct</div>
                ) : (
                  <div className=" text-danger">Incorrect</div>
                )}
              </Card.Body>
            </CCallout>
          ))}
        </Col>
      )}
    </Container>
  );
};

export default QuizView;
