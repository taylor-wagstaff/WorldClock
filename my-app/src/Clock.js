import './Clock.css'
import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'

function Clock() {
  const [time, setTime] = useState('')
  const [timeProgress, setTimeProgress] = useState(0)
  const [location, setLocation] = useState('Pacific/Auckland')

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
      setTime(getTimeInTimeZone(location))
    }, 1000)

    return () => clearInterval(interval)
  }, [location])

  useEffect(() => {
    let hour = parseInt(time.slice(0, 2), 10)
    let minute = parseInt(time.slice(3, 5), 10)
    let amOrPm = time.slice(-2)

    if (amOrPm === 'PM' && hour !== 12) {
      hour += 12 // Convert to 24-hour format
    }
    if (amOrPm === 'AM' && hour === 12) {
      hour = 0
    }

    let elapsedMinutes = hour * 60 + minute
    let progress = (elapsedMinutes / 1440) * 100

    setTimeProgress(Math.round(progress))
  }, [time])

  const handleChange = (e) => {
    setLocation(e.target.value)
  }

  const locationName = location.split('/').pop()

  return (
    <div className="clock">
      <header className="clock-header">
        <ProgressBar progress={timeProgress} />
        <p>
          {locationName}: {time}
        </p>
      </header>
      <div className="location-select">
        <label>
          What location?
          <select value={location} onChange={handleChange}>
            <option value="Pacific/Auckland">Auckland</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Europe/Berlin">Berlin</option>
            <option value="America/New_York">New York</option>
            <option value="Europe/Moscow">Moscow</option>
            <option value="Australia/Sydney">Sydney</option>
            <option value="America/Los_Angeles">Los Angeles</option>
            <option value="Asia/Kolkata">New Delhi</option>
            <option value="Asia/Shanghai">Beijing</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Clock
