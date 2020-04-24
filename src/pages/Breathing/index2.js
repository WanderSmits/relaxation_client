import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";
import { selectProfile } from "../../store/profile/selector";
import BreatheIn from "../../components/BreatheIn";
import BreatheOut from "../../components/BreatheOut";
import ProgressExercise from "../../components/ProgressExercise";
import DoneExercise from "../../components/DoneExercise";

import RainyAnimation from "../../img/rainy_animation.svg";
import RainySounds from "../../sounds/rain_sounds.mp3";

export default function Breathing() {
  // the rain sound at page load
  const [rain, setRain] = useState(new Audio(RainySounds));
  // breathe interval
  const [exercise, setExercise] = useState(0);
  // total duration exercise
  const [counter, setCounter] = useState(0);

  // when the user clicks on the breathe button
  const [isBreathing, setIsBreathing] = useState(false);
  // Screen when the exercise is done
  const [doneMessage, setDoneMessage] = useState(false);

  //get the profile preferences from the user
  const profile = useSelector(selectProfile);

  // the duration of the exercise
  const initialCount = profile.duration_exercise * 60;

  // if profile.interval == undefined set default value
  const seconds =
    profile.interval == undefined
      ? (profile.interval = 3)
      : profile.interval * 1000;

  function toggle() {
    setIsBreathing(!isBreathing);
    setCounter(initialCount);
  }

  useEffect(() => {
    rain.play();
  }, []);

  useEffect(() => {
    if (isBreathing) {
      setTimeout(() => setExercise(!exercise), seconds);
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [isBreathing, exercise, counter, seconds]);

  function stopExercise() {
    setIsBreathing(false);
    setDoneMessage(true);
    setRain(rain.pause());
  }

  return (
    <>
      {!doneMessage ? (
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
            {isBreathing ? (
              exercise ? (
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
            {!isBreathing ? (
              <Button variant="light" onClick={toggle}>
                Breathe!
              </Button>
            ) : (
              <Button variant="light" onClick={pauseExercise}>
                Pause!
              </Button>
            )}
          </div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
              color: "black",
            }}
          >
            {isBreathing ? counter : null}
          </h1>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20vh",
            }}
          >
            {isBreathing ? (
              <ProgressExercise
                counter={counter}
                initialCount={initialCount}
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
