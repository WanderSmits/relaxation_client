import React, { useEffect, useState, useRef } from "react";
import "./ProgressExercise.css";

export default function ProgressExercise(props) {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const {
    counter,
    initialCount,
    size,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
    stopExercise,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  console.log(counter);
  console.log(initialCount);

  useEffect(() => {
    const progressOffset =
      circumference - (counter / initialCount) * circumference;
    setOffset(progressOffset);
    if (counter <= 0) {
      stopExercise();
    }
    //shows the progress the circle made in a more smooth way
    circleRef.current.style =
      "transition: stroke-dashoffset 1000ms ease-in-out";
  }, [setOffset, counter, circumference, offset]);

  return (
    <div>
      <p>{counter}</p>
      <svg className="svg" width={size} height={size}>
        {/* progress circle */}
        <circle
          className="svg-circle-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* total circle */}
        <circle
          className="svg-circle"
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x={`${center}`} y={`${center}`} className="svg-circle-text">
          {counter}%
        </text>
      </svg>
    </div>
  );
}
