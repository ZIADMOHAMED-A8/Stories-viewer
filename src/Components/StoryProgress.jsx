import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import styles from '../Components/StoryProgress.module.css'
import { useGetStoriesQuery } from "../../storiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIndex } from "../../currentViewedSlice";

  const StoryProgress = forwardRef(({ duration = 3000, parentRef, ...props }, ref) => {
    const [value, setValue] = useState(0);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedRef = useRef(0);
  
    let { data } = useGetStoriesQuery();
    let dispatch = useDispatch();
    let index = useSelector((state) => state.current.index);
    let nav = useNavigate();
  
    useImperativeHandle(ref, () => ({
      pause: () => {
        clearInterval(timerRef.current);
        elapsedRef.current += Date.now() - startTimeRef.current;
      },
      resume: () => {
        startTimer();
      },
      reset: () => {
        clearInterval(timerRef.current);
        setValue(0);
        elapsedRef.current = 0;
        startTimer();
      }
    }));
  
    const startTimer = () => {
      startTimeRef.current = Date.now();
      clearInterval(timerRef.current);
  
      timerRef.current = setInterval(() => {
        let progress = ((Date.now() - startTimeRef.current + elapsedRef.current) / duration) * 100;
  
        if (progress >= 100) {
          progress = 100;
          clearInterval(timerRef.current);
          elapsedRef.current = 0; 
  
          if (index === data.length - 1) {
            nav('');
          } else {
            dispatch(setIndex({ index: index + 1 }));
            parentRef.current.children[index].scrollIntoView({ behavior: "smooth", inline: "center" });
          }
        }
  
        setValue(progress);
      }, 50);
    };
  
    useEffect(() => {
      elapsedRef.current = 0;
      startTimer();
      return () => clearInterval(timerRef.current);
    }, [duration, index]);
  
    return (
      <progress value={value} max="100" {...props} className={styles["story-progress"]}></progress>
    );
  });
  export default StoryProgress