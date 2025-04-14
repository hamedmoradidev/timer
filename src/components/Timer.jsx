import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
export default function Timer() {
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimerRef = useRef(0)

    useEffect(() => {
      if(isRunning){
        intervalIdRef.current = setInterval(() => {
          setElapsedTime(Date.now() - startTimerRef.current)
        }, 10);
      }
      return () => {
        clearInterval(intervalIdRef.current)
      }
    }), [isRunning]
    function start(){
      setIsRunning(true)
      startTimerRef.current = Date.now() - elapsedTime
    }
    function stop(){
      setIsRunning(false)
    }
    function reset(){
      setElapsedTime(0)
      setIsRunning(false)
    }
    function formatTime(){
      let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
      let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
      let seconds = Math.floor(elapsedTime / (1000) % 60)
      let miliseconds = Math.floor((elapsedTime % 1000) / 10)
      hours = String(hours).padStart(2, "0")
      minutes = String(minutes).padStart(2, "0")
      seconds = String(seconds).padStart(2, "0")
      miliseconds = String(miliseconds).padStart(2, "0")
      return `${hours}:${minutes}:${seconds}:${miliseconds}`
    }
  return (
    <div className='w-full h-lvh flex justify-center items-center flex-wrap bg-gray-950'>
        <div className='w-full flex justify-center'>
          <div className='text-white font-bold text-8xl font-mono'>
            {formatTime()}
          </div>
        </div>
        <div className='w-full flex justify-center gap-5 text-white font-semibold *:cursor-pointer'>
          <button className='w-20 h-12 bg-green-500 hover:bg-green-600 rounded-2xl' onClick={start}>Start</button>
          <button className='w-20 h-12 bg-red-500 hover:bg-red-600 rounded-2xl' onClick={stop}>Stop</button>
          <button className='w-20 h-12 bg-blue-500 hover:bg-blue-600 rounded-2xl' onClick={reset}>Reset</button>
        </div>
    </div>
  )
}
