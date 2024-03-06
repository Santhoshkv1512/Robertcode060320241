import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { useSnapshot } from "valtio";
import { state } from "../../store";

const ProgressBar = () => {
  const snap = useSnapshot(state);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let total = snap.progressArray[0] + snap.progressArray[1] + snap.progressArray[2] + snap.progressArray[3] + snap.progressArray[4] + snap.progressArray[5] + snap.progressArray[6] + snap.progressArray[7];
    if (total) setProgressValue(Math.ceil(100 / 8) * total);
    if (total === 8) setProgressValue(100);
  }, [snap.progressArray])

  return (
    <Example >
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={progressValue}
        duration={1.4}
        easingFunction={easeQuadInOut}
        repeat
      >
        {value => {
          return (
            <CircularProgressbar
              value={value}
              text={`${progressValue}%`}
              /* This is important to include, because if you're fully managing the
        animation yourself, you'll want to disable the CSS animation. */
              styles={buildStyles({ pathTransition: "none" })}
            />
          );
        }}
      </AnimatedProgressProvider>
    </Example>
  );
};

function Example(props) {
  return (
    <>
      <div style={{ width: "40%", paddingRight: 30 }}>{props.children}</div>
      <div style={{ width: "70%" }}>
        <h1 className="h4">{props.label}</h1>
        <p>{props.description}</p>
      </div>
    </>
  );
}

export default ProgressBar;