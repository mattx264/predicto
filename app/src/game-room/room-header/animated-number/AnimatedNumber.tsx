import React, { useState, useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatter?: (num: number) => string;
  className?: string;
}

const easeOutQuad = (progress: number) => {
  return 1 - Math.pow(1 - progress, 3);
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 500,
  formatter = (num) => Math.round(num).toLocaleString("pl-PL"),
  className,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const animationFrameRef = useRef<number | null>(null);
  const startValueRef = useRef(value);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    startValueRef.current = displayValue;
    const targetValue = value;
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const newDisplayValue =
        startValueRef.current +
        (targetValue - startValueRef.current) * easedProgress;
      setDisplayValue(newDisplayValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  return <span className={className}>{formatter(displayValue)}</span>;
};

export default AnimatedNumber;
