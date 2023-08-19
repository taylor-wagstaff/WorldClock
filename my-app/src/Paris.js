import './Paris.css'
import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'

function Paris() {
  const [parisTime, setParisTime] = useState('')
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
      setParisTime(getTimeInTimeZone('Europe/Paris'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let hour = parseInt(parisTime.slice(0, 2), 10)
    let minute = parseInt(parisTime.slice(3, 5), 10)
    let amOrPm = parisTime.slice(-2)

    if (amOrPm === 'PM' && hour !== 12) {
      hour += 12 // Convert to 24-hour format
    }
    if (amOrPm === 'AM' && hour === 12) {
      hour = 0
    }

    let elapsedMinutes = hour * 60 + minute
    let progress = (elapsedMinutes / 1440) * 100

    setTimeProgress(Math.round(progress))
  }, [parisTime])

  return (
    <div className="parisClock">
      <header className="paris-clock-header">
        <ProgressBar progress={timeProgress} />
        <p>Paris: {parisTime}</p>
      </header>
    </div>
  )
}

export default Paris
