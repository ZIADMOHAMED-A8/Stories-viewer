import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import styles from "../Components/StoryProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIndex, setInIndex } from "../../currentViewedSlice";
import { useGetUsersQuery } from "../../storiesSlice";
import { useTimer } from "react-timer-hook";

const StoryProgress = forwardRef(
  ({ active, duration = 3000, parentRef, ...props }, ref) => {
    const [value, setValue] = useState(0);
    const startTimeRef = useRef(null);
    
    let { data } = useGetUsersQuery();
    let dispatch = useDispatch();
    let index = useSelector((state) => state.current.index);
    let InIndex = useSelector((state) => state.current.InIndex);
    
    let nav = useNavigate();

    const getExpiryTimestamp = () => {
      const time = new Date();
      time.setMilliseconds(time.getMilliseconds() + duration);
      return time;
    };

    const { pause, resume, restart, isRunning, start } = useTimer({
      expiryTimestamp: getExpiryTimestamp(),
      onExpire: () => {
        if (index === data.length - 1) {
          nav("/");
        } else {
          if (data[index].stories.length - 1 === InIndex) {
            dispatch(setIndex({ index: index + 1 }));
            dispatch(setInIndex({ InIndex: 0 }));
            parentRef.current.children[index].scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          } else {
            dispatch(setInIndex({ InIndex: InIndex + 1 }));
          }
        }
      },
      autoStart: false,
    });

    useImperativeHandle(ref, () => ({
      pause: () => pause(),
      resume: () => resume(),
      reset: () => {
        restart(getExpiryTimestamp());
        setValue(0);
        startTimeRef.current = Date.now();
      },
    }));

    useEffect(() => {
      if (active && !isRunning) {
        startTimeRef.current = Date.now();
        start();
      } else if (!active && isRunning) {
        pause();
      }
    }, [active, isRunning, start, pause]);

    useEffect(() => {
      if (active && isRunning && startTimeRef.current) {
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTimeRef.current;
          const progress = (elapsed / duration) * 100;
          setValue(Math.min(progress, 100));
        }, 50);

        return () => clearInterval(interval);
      }
    }, [active, isRunning, duration]);

    useEffect(() => {
      if (active) {
        restart(getExpiryTimestamp());
        setValue(0);
        startTimeRef.current = Date.now();
        start();
      }
    }, [index, InIndex]);

    return (
      <progress
        value={value}
        max="100"
        {...props}
        className={styles["story-progress"]}
      />
    );
  }
);

export default StoryProgress;
