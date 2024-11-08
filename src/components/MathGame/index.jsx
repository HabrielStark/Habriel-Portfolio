import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GameContainer = styled(motion.div)`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid #4A90E2;
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
`;

const Question = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const Option = styled(motion.button)`
  background: rgba(74, 144, 226, 0.2);
  border: 1px solid #4A90E2;
  padding: 15px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.3);
  }
`;

const Score = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #4A90E2;
`;

const generateQuestion = () => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2, answer;

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50);
      num2 = Math.floor(Math.random() * 50);
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 25;
      num2 = Math.floor(Math.random() * 25);
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12);
      num2 = Math.floor(Math.random() * 12);
      answer = num1 * num2;
      break;
    default:
      break;
  }

  const options = [
    answer,
    answer + Math.floor(Math.random() * 10) + 1,
    answer - Math.floor(Math.random() * 10) - 1,
    answer * 2
  ].sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${operation} ${num2} = ?`,
    options,
    answer
  };
};

function MathGame() {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setCurrentQuestion(generateQuestion());
      setIsAnswered(false);
    }, 1000);
  };

  return (
    <GameContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Math Challenge</h2>
      <Question>{currentQuestion.question}</Question>

      <OptionsGrid>
        {currentQuestion.options.map((option, index) => (
          <Option
            key={index}
            onClick={() => handleAnswer(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              background: isAnswered
                ? option === currentQuestion.answer
                  ? 'rgba(76, 175, 80, 0.3)'
                  : 'rgba(244, 67, 54, 0.3)'
                : 'rgba(74, 144, 226, 0.2)'
            }}
          >
            {option}
          </Option>
        ))}
      </OptionsGrid>

      <Score>Score: {score}</Score>
    </GameContainer>
  );
}

export default MathGame; 