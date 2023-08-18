import './Auckland.css'
import React, { useState, useEffect } from 'react'

function Auckland() {
  const [aucklandTime, setAucklandTime] = useState('')
  const [timeProgress, setTimeProgress] = useState(0)

  //  Chat GPT was used to access timezone information
  const getTimeInTimeZone = (timeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timeZone,
      hour12: true,
      hourCycle: 'h11',
    }).format(new Date())
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setAucklandTime(getTimeInTimeZone('Pacific/Auckland'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let hour = parseInt(aucklandTime.slice(0, 2), 10)
    let minute = parseInt(aucklandTime.slice(3, 5), 10)
    let amOrPm = aucklandTime.slice(-2)

    if (amOrPm === 'PM' && hour !== 12) {
      hour += 12 // Convert to 24-hour format
    }
    if (amOrPm === 'AM' && hour === 12) {
      hour = 0
    }

    let elapsedMinutes = hour * 60 + minute
    let progress = (elapsedMinutes / 1440) * 100

    setTimeProgress(Math.round(progress))
  }, [aucklandTime])

  return (
    <div className="AucklandClock">
      <header className="clock-header">
        <p>Auckland time: {aucklandTime}</p>
        <p>Day Progress: {timeProgress}%</p>
      </header>
    </div>
  )
}

export default Auckland
