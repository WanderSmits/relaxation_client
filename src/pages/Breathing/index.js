import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectProfile } from "../../store/profile/selector";
import BreatheIn from "../../components/BreatheIn";
import BreatheOut from "../../components/BreatheOut";

export default function Breathing() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [startCounting, setStartCounting] = useState(false);
  const [something, setSomething] = useState(true);
  const [counter, setCounter] = useState(0);

  const profile = useSelector(selectProfile);

  function toggle() {
    setIsBreathing(!isBreathing);
    setStartCounting(!startCounting);
    setCounter(profile.duration_exercise * 60);
  }

  useEffect(() => {
    // if startCounting is true set timer
    if (startCounting) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [startCounting, counter]);

  const seconds = profile.interval * 1000;

  useEffect(() => {
    if (isBreathing) {
      setTimeout(() => setSomething(!something), seconds);
    }
  }, [isBreathing, something]);

  console.log("What is in my profile? ", profile);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ fontSize: "3rem", padding: "2rem" }}>
        {something ? <BreatheIn /> : <BreatheOut />}
      </div>
      {!isBreathing ? <button onClick={toggle}>Breathe!</button> : null}

      <div> {counter}</div>
    </div>
  );
}
