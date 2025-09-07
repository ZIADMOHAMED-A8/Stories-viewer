import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import styles from "../Components/StoryProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIndex, setInIndex } from "../../currentViewedSlice";
import { useGetUsersQuery } from "../../storiesSlice";

const StoryProgress = forwardRef(
  ({ active, autoStart = false, duration = 3000, parentRef, ...props }, ref) => {
    const [value, setValue] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const startTimeRef = useRef(null);
    const elapsedTimeRef = useRef(0);
    const intervalRef = useRef(null);
    
    let { data } = useGetUsersQuery();
    let dispatch = useDispatch();
    let index = useSelector((state) => state.current.index);
    let InIndex = useSelector((state) => state.current.InIndex);
    
    let nav = useNavigate();

    const handleComplete = () => {
      setHasCompleted(true);
      if (index === data.length - 1) {
        nav("/");
      } else {
        if (data[index].stories.length - 1 === InIndex) {
          dispatch(setIndex({ index: index + 1 }));
          dispatch(setInIndex({ InIndex: 0 }));
          if (parentRef.current?.children[index + 1]) {
            parentRef.current.children[index + 1].scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          }
        } else {
          console.log(InIndex)

          dispatch(setInIndex({ InIndex: InIndex + 1 }));
        }
      }
    };

    const stopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startTimer = () => {
      if (!active || isPaused || !isStarted) return;
      if (intervalRef.current) return;
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        if (isPaused) return;
        const currentElapsed = Date.now() - startTimeRef.current;
        const totalElapsed = elapsedTimeRef.current + currentElapsed;
        const progress = (totalElapsed / duration) * 100;
        if (progress >= 100) {
          setValue(100);
          stopTimer();
          elapsedTimeRef.current = 0;
          startTimeRef.current = null;
          handleComplete();
        } else {
          setValue(Math.min(progress, 100));
        }
      }, 50);
    };

    const start = () => {
      if (!isStarted) {
        setIsStarted(true);
        setIsPaused(false);
        setHasCompleted(false);
        elapsedTimeRef.current = 0;
        startTimeRef.current = null;
      }
    };

    const pause = () => {
      if (!isPaused && startTimeRef.current && isStarted) {
        elapsedTimeRef.current += Date.now() - startTimeRef.current;
        setIsPaused(true);
        stopTimer();
      }
    };

    const resume = () => {
      if (isPaused && isStarted) {
        setIsPaused(false);
      }
    };

    const reset = () => {
      stopTimer();
      setValue(0);
      elapsedTimeRef.current = 0;
      startTimeRef.current = null;
      setIsPaused(false);
      setIsStarted(false);
      setHasCompleted(false);
    };

    useImperativeHandle(ref, () => ({
      start,
      pause,
      resume,
      reset,
      isPaused,
      isStarted,
    }));

    // Manage interval based on state
    useEffect(() => {
      if (active && isStarted && !isPaused) {
        startTimer();
      } else {
        stopTimer();
      }
      return () => stopTimer();
    }, [active, isPaused, isStarted, duration]);

    // On index/InIndex change: only reset/autoStart if THIS progress is active
    useEffect(() => {
      if (active) {
        reset();
        if (autoStart) {
          start();
        }
      }
      // If not active, do nothing so finished bars remain filled
    }, [index, InIndex]);

    // When becoming inactive, keep 100% if completed; don't reset value
    useEffect(() => {
      if (!active) {
        stopTimer();
        if (hasCompleted) {
          setValue(100);
        }
      }
    }, [active, hasCompleted]);

    return (
      <progress
        value={value}
        max="100"
        {...props}
        className={styles["story-progress"]}
        style={{ width: '100%', height: '4px', ...props.style }}
      />
    );
  }
);

StoryProgress.displayName = 'StoryProgress';

export default StoryProgress;