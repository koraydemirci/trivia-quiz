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

  return (
    <div>
      <h1 ref={ref}>{timeLeft}</h1>
    </div>
  )
})

export default Timer
