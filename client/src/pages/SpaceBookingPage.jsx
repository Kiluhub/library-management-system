import { useState } from 'react'

function SpaceBookingPage() {
  const [space, setSpace] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (endTime <= startTime) {
      setMessage('End time must be after start time.')
      return
    }

    const booking = {
      space,
      date,
      startTime,
      endTime,
    }

    console.log('Booking submitted:', booking)

    setMessage('Booking form submitted successfully!')

    setSpace('')
    setDate('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <main>
      <h1>Book a Library Space</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="booking-form">
        <label>Choose Space</label>

        <select
          value={space}
          onChange={(e) => setSpace(e.target.value)}
          required
        >
          <option value="">Select a space</option>
          <option value="Study Room 1">Study Room 1</option>
          <option value="Study Room 2">Study Room 2</option>
          <option value="Computer Lab">Computer Lab</option>
          <option value="Discussion Room">Discussion Room</option>
        </select>

        <label>Booking Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Start Time</label>

        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label>End Time</label>

        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <button type="submit">Submit Booking</button>
      </form>
    </main>
  )
}

export default SpaceBookingPage