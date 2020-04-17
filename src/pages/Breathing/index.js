import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectProfile } from "../../store/profile/selector";
import BreatheIn from "../../components/BreatheIn";
import BreatheOut from "../../components/BreatheOut";
import ProgressExercise from "../../components/ProgressExercise";
import DoneExercise from "../../components/DoneExercise";

export default function Breathing() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [exercise, setExercise] = useState(true);
  const [counter, setCounter] = useState(0.1 * 60);
  const [doneMessage, setDoneMessage] = useState(false);

  const profile = useSelector(selectProfile);

  const initialCount = 1 * 60;
  // const seconds = profile.interval * 1000;
  const seconds = 3 * 1000;

  function toggle() {
    setIsBreathing(!isBreathing);
    setStartCounting(!startCounting);
    // setCounter(initialCount);
  }

  useEffect(() => {
    if (isBreathing && startCounting) {
      setTimeout(() => setExercise(!exercise), seconds);
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [isBreathing, exercise, startCounting, counter]);

  function stopExercise() {
    setIsBreathing(false);
    setStartCounting(false);
    setDoneMessage(true);
  }

  return (
    <>
      {!doneMessage ? (
        <div>
          <div
            style={{
              fontSize: "3rem",
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            {exercise ? <BreatheIn /> : <BreatheOut />}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            {!isBreathing ? <button onClick={toggle}>Breathe!</button> : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "30vh",
            }}
          >
            {" "}
            {startCounting ? (
              <ProgressExercise
                counter={counter}
                initialCount={initialCount}
                size={200}
                strokeWidth={7}
                circleOneStroke={"#7ea9e1"}
                circleTwoStroke={"#ed004f"}
                stopExercise={stopExercise}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <DoneExercise />
      )}
    </>
  );
}
