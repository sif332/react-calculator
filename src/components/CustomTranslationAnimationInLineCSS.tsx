import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

export enum EDuration {
  Instant = "100ms",
  Short = "500ms",
  Normal = "1s",
  Long = "2s",
}

export enum EDelay {
  NO = "0",
  Short = "200ms",
  Normal = "500ms",
  Long = "1s",
}

export enum ECustomTranslate {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

const customTranslateMap = {
  Up: { start: "translateY(2.5rem)", end: "translateY(0)" },
  Down: { start: "translateY(-2.5rem)", end: "translateY(0)" },
  Left: { start: "translateX(-33%)", end: "translateX(0)" },
  Right: { start: "translateX(33%)", end: "translateX(0)" },
};

interface IProps {
  customDuration?: EDuration;
  customDelay?: EDelay;
  directionTranslate?: ECustomTranslate;
  children: React.ReactNode;
}

export default function CustomTranslationAnimationInLineCSS({
  customDuration = EDuration.Normal,
  customDelay = EDelay.NO,
  directionTranslate = ECustomTranslate.Up,
  children,
}: IProps) {
  const wasInView = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  if (inView && !wasInView.current) {
    wasInView.current = true;
  }

  const renderCondition = wasInView.current
    ? {
        opacity: "1",
        filter: "blur(0)",
        transform: customTranslateMap[directionTranslate].end,
      }
    : {
        opacity: "0",
        filter: "blur(4px)",
        transform: customTranslateMap[directionTranslate].start,
      };

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <div
        style={{
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          transitionDuration: customDuration,
          transitionDelay: customDelay,
          ...renderCondition,
        }}
      >
        {children}
      </div>
    </div>
  );
}
