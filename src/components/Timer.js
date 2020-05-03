import React, { useState, useEffect } from "react";
import AppConfig from "../config";

const { timeToAnswerQuestion } = AppConfig;

const Timer = React.forwardRef((props, ref) => {
  const [timeLeft, setTimeLeft] = useState(timeToAnswerQuestion);
  const { handleTimeIsUp } = props;

  useEffect(() => {
    if (!timeLeft) {
      handleTimeIsUp();
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, handleTimeIsUp]);

  return <strong ref={ref}>{timeLeft}</strong>;
});

export default Timer;
