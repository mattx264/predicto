import React, { useEffect, useRef, useState } from "react";
import "./AnimatedTicker.css";

const createNumberArray = (number: number, minDigits: number): number[] => {
  const numberString = Math.floor(number).toString();
  const numberArray = numberString.split("").map(Number);

  const targetDigits = Math.max(minDigits, numberArray.length);

  while (numberArray.length < targetDigits) {
    numberArray.unshift(0);
  }

  return numberArray;
};

const calcDeltaBetweenNumbers = (
  oldNumber: number,
  newNumber: number
): number[] => {
  const numberArray = [oldNumber];
  if (oldNumber === newNumber) {
    return numberArray;
  }

  let current = oldNumber;
  while (current !== newNumber) {
    current++;
    if (current > 9) current = 0;
    numberArray.push(current);
  }
  return numberArray;
};

interface AnimatedTickerProps {
  value: number;
  digits: number;
  duration?: string;
}

const AnimatedTicker: React.FC<AnimatedTickerProps> = ({
  value,
  digits: minDigits,
  duration = "1s",
}) => {
  const oldDigitsRef = useRef<number[]>(createNumberArray(value, minDigits));

  const [digitGroups, setDigitGroups] = useState<number[][]>([]);
  const [transforms, setTransforms] = useState<number[]>([]);

  useEffect(() => {
    const newDigits = createNumberArray(value, minDigits);
    let oldDigits = oldDigitsRef.current;

    const newLength = newDigits.length;
    const oldLength = oldDigits.length;

    if (newLength > oldLength) {
      oldDigits = [...Array(newLength - oldLength).fill(0), ...oldDigits];
    } else if (oldLength > newLength) {
      // ASDF
    }

    const newDigitGroups: number[][] = [];
    const newTransforms: number[] = [];

    newDigits.forEach((newDigit, index) => {
      const oldDigit = oldDigits[index];
      const deltas = calcDeltaBetweenNumbers(oldDigit, newDigit);
      newDigitGroups.push(deltas);
      newTransforms.push(deltas.length - 1);
    });

    setDigitGroups(newDigitGroups);

    const timeoutId = setTimeout(() => {
      setTransforms(newTransforms);
    }, 10);

    oldDigitsRef.current = newDigits;

    return () => clearTimeout(timeoutId);
  }, [value, minDigits]);

  return (
    <span className="animated-ticker" aria-label={value.toString()}>
      {digitGroups.map((deltas, index) => (
        <span
          key={index}
          className="ticker-column"
          style={{
            transform: `translateY(-${transforms[index] * 100}%)`,
            transitionDuration: duration,
          }}
        >
          {deltas.map((digit, i) => (
            <span key={i} className="ticker-digit">
              {digit}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default AnimatedTicker;
