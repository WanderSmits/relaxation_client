import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";

import BreatheIn from "../../components/BreatheIn";
import BreatheOut from "../../components/BreatheOut";
import ProgressExercise from "../../components/ProgressExercise";
import DoneExercise from "../../components/DoneExercise";

import RainyAnimation from "../../img/rainy_animation.svg";
import RainySounds from "../../sounds/rain_sounds.mp3";

import { selectProfile } from "../../store/profile/selector";

export default function Breathing() {
  const profile = useSelector(selectProfile);
  const [rain, setRain] = useState(new Audio(RainySounds));

  const [time, setTime] = useState(0);
  const [targetInterval, setTargetInterval] = useState(0);
  const [initialValue, setInitialValue] = useState(false);

  const [icon, setIcon] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const [doneExercise, setDoneExercise] = useState(false);
  const [paused, setPaused] = useState(true);

  const totalLength = profile.duration_exercise * 60;

  function tick() {
    if (paused) return;
    else setTime(time - 1);

    if (time === targetInterval) {
      const newIcon = icon === false ? true : false;
      setIcon(newIcon);

      const newTarget = targetInterval - profile.interval;
      setTargetInterval(newTarget);
    }
  }

  function toggle() {
    setButtonClicked(!buttonClicked);
    setPaused(!paused);
    setShowTimer(true);
    startingValues();
  }

  // setup initial values, is it the first time the initival value is set, set it to the total length of the exercise
  function startingValues() {
    if (!initialValue) {
      setTargetInterval(totalLength - profile.interval + 1);
      setTime(totalLength);
      setInitialValue(true);
    } else {
      setTargetInterval(targetInterval - 1);
      setTime(time - 1);
    }
  }

  function stopExercise() {
    setButtonClicked(false);
    setDoneExercise(true);
    setRain(rain.pause());
  }

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    rain.play();
    rain.volume = 0.4;
  }, []);

  const action = paused ? "Breathe" : "Pause";
  const display = time;

  return (
    <>
      {!doneExercise ? (
        <div
          style={{
            height: "100vh",
            backgroundImage: `url(${RainyAnimation})`,
          }}
        >
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
                initialCount={totalLength}
                size={200}
                strokeWidth={7}
                circleOneStroke={"#ffffff"}
                circleTwoStroke={"#08aae1"}
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
