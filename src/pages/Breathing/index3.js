import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";

import BreatheIn from "../../components/BreatheIn";
import BreatheOut from "../../components/BreatheOut";
import ProgressExercise from "../../components/ProgressExercise";
import DoneExercise from "../../components/DoneExercise";

import { selectProfile } from "../../store/profile/selector";

export default function Breathing() {
  const profile = useSelector(selectProfile);

  const max = profile.duration_exercise * 60;

  const [paused, setPaused] = useState(true);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState(0);
  const [icon, setIcon] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [target, setTarget] = useState(0);

  // console.log("PRofile", profile.duration_exercise);

  const breathingInterval = max - profile.interval;

  // console.log("Profile?", profile);
  function tick() {
    if (paused || over) return;
    if (time <= 0) setOver(true);
    else setTime(time - 1);

    if (time === target) {
      const newIcon = icon === false ? true : false;
      setIcon(newIcon);

      const newTarget = target - profile.interval;
      setTarget(newTarget);
    }
  }

  // function reset() {
  //   setTime(max);
  //   setPaused(false);
  //   setOver(false);
  // }

  function toggle() {
    setButtonClicked(!buttonClicked);
    setPaused(!paused);
    setShowTimer(true);
  }

  function stopExercise() {
    console.log("Stop");
    // setButtonClicked(false);
    // setDoneMessage(true);
    // setRain(rain.pause());
  }

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const action = paused ? "Start" : "Pause";
  const display = over ? "Done" : time;

  return (
    <div>
      <div
        style={{
          fontSize: "3rem",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        {/*Double ternary checks if button is clicked, if so show the icon and start the breathe-in interval*/}
        {buttonClicked ? (
          !icon ? (
            <BreatheIn duration={profile.interval} />
          ) : (
            <BreatheOut duration={profile.interval} />
          )
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Button variant="light" onClick={toggle}>
          {action}
        </Button>
        {/* <Button variant="light" onClick={reset}>
          Reset
        </Button> */}
      </div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
          color: "white",
        }}
      >
        {showTimer ? display : null}
      </h1>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        {showTimer ? (
          <ProgressExercise
            counter={time}
            initialCount={max}
            size={200}
            strokeWidth={7}
            circleOneStroke={"#ffffff"}
            circleTwoStroke={"#08aae1"}
            stopExercise={stopExercise}
          />
        ) : null}
      </div>
    </div>
  );
}
