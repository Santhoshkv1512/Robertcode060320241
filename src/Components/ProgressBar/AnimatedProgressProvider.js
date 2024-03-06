import React, { useState, useEffect } from 'react';  
import { Animate } from 'react-move';

function AnimatedProgressProvider({ 
  children, 
  valueStart, 
  valueEnd, 
  duration, 
  easingFunction,
  repeat 
}) {

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if(repeat) {
      const interval = setInterval(() => {
        setIsAnimated(prev => !prev);
      }, duration * 1000);
      return () => clearInterval(interval);
    } else {
      setIsAnimated(true); 
    }
  }, [duration, repeat]);
  
  return (
    <Animate
      start={() => ({
        value: valueStart  
      })}
      update={() => ({
        value: [isAnimated ? valueEnd : valueStart],
        timing: {
          duration: duration * 1000,
          ease: easingFunction
        }  
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
}

export default AnimatedProgressProvider;