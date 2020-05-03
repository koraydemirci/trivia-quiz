import React from "react";
import { Header, Button } from "semantic-ui-react";

const Question = ({ currentQuestion, checkAnswer }) => {
  const { allAnswers } = currentQuestion;
  return (
    <>
      <Header size="medium">{currentQuestion.question}</Header>
      {allAnswers.map((question, index) => (
        <div className="buttonContainer" key={index}>
          <Button
            onClick={checkAnswer}
            content={question}
            basic
            fluid
            size="large"
          />
        </div>
      ))}
    </>
  );
};

export default Question;
