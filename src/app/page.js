"use client"


import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  function startTimer() {
    const input = document.getElementById('timerInput');
    const enteredTime = input.value;
    const timeArr = enteredTime.split(':');

    if (timeArr.length !== 3) {
      alert('Please enter time in the format hh:mm:ss');
      return;
    }

    const hours = parseInt(timeArr[0]);
    const minutes = parseInt(timeArr[1]);
    const seconds = parseInt(timeArr[2]);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      alert('Please enter valid numbers for hours, minutes, and seconds');
      return;
    }

    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeInSeconds(totalTimeInSeconds);
    setRunning(true);
  }

  function stopTimer() {
    setRunning(false);
  }

  function resetTimer() {
    setTimeInSeconds(0);
    setRunning(false);
  }

  function resumeTimer() {
    setRunning(true);
  }

  useEffect(() => {
    if (running && timeInSeconds > 0) {
      const interval = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [running, timeInSeconds]);

  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Timer <a href="https://github.com/dimkadi">by Dmitri!</a>
        </h1>
        <div>
          <input type="text" id="timerInput" placeholder="hh:mm:ss" maxLength="8" />
          {running ? (
            <>
              <button onClick={stopTimer}>Stop</button>
              <button onClick={resetTimer}>Reset</button>
            </>
          ) : (
            <>
              <button onClick={startTimer}>Start</button>
            </>
          )}
          {!running && timeInSeconds > 0 && <button onClick={resumeTimer}>Resume</button>}
        </div>
        <div id="timerDisplay">{formatTime(timeInSeconds)}</div>
      </main>
    </>
  );
}
