import React, { useState, useEffect } from 'react'

const Timer = React.forwardRef((props, ref) => {
  const [timeLeft, setTimeLeft] = useState(15)
  const { handleTimeIsUp } = props

  useEffect(() => {
    if (!timeLeft) {
      handleTimeIsUp()
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft, handleTimeIsUp])

  return <strong ref={ref}>{timeLeft}</strong>
})

export default Timer
