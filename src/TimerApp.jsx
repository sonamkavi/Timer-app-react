import React, { useState, useEffect } from 'react';

const TimerApp = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [hoursInput, setHoursInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [secondsInput, setSecondsInput] = useState('');

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString();
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return { hours, minutes, seconds };
  };

  const handleSetTime = () => {
    const hours = parseInt(hoursInput) || 0;
    const minutes = parseInt(minutesInput) || 0;
    const seconds = parseInt(secondsInput) || 0;
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(totalTimeInSeconds);
    setInitialTime(totalTimeInSeconds);
    setIsRunning(false);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const { hours, minutes, seconds } = formatTime(time);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / initialTime) * circumference || 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Timer App</h1>

        <div style={{ marginBottom: '100px' }}>
          <input type="number" placeholder="HH" value={hoursInput} onChange={(e) => setHoursInput(e.target.value)} style={{ width: '50px', marginRight: '5px' }} />
          <input type="number" placeholder="MM" value={minutesInput} onChange={(e) => setMinutesInput(e.target.value)} style={{ width: '50px', marginRight: '5px' }} />
          <input type="number" placeholder="SS" value={secondsInput} onChange={(e) => setSecondsInput(e.target.value)} style={{ width: '50px', marginRight: '5px' }} />
          <button onClick={handleSetTime}>Set Time</button>
        </div>

        <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
          <svg width="200" height="200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="lightgrey"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="green"
              strokeWidth="9"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem' }}>
            {hours}:{minutes}:{seconds}
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleStartPause} style={{ marginRight: '10px' }}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default TimerApp;
