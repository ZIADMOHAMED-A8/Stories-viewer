import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import styles from '../Components/StoryProgress.module.css'
import { useGetStoriesQuery, useGetUsersQuery } from "../../storiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIndex, setInIndex } from "../../currentViewedSlice";

  const StoryProgress = forwardRef(({ active,duration = 3000, parentRef,setisPaused, ...props }, ref) => {
    const [value, setValue] = useState(0);
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedRef = useRef(0);
  
    let { data } = useGetUsersQuery();
    let dispatch = useDispatch();
    let index = useSelector((state) => state.current.index);
    let InIndex = useSelector((state) => state.current.InIndex);
  
    let nav = useNavigate();
    useImperativeHandle(ref, () => ({
      pause: () => {
        if (timerRef.current && startTimeRef.current) {
          clearInterval(timerRef.current);
          elapsedRef.current += Date.now() - startTimeRef.current;
        }
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
            if(data[index].stories.length-1===InIndex){
            dispatch(setIndex({ index: index + 1 }));
            dispatch(setInIndex({InIndex:0}))
            parentRef.current.children[index].scrollIntoView({ behavior: "smooth", inline: "center" });
      
          }
          else{
            dispatch(setInIndex({InIndex:InIndex+1}))

          }
          }
        }
  
        setValue(progress);
      }, 50);
    };
  
    useEffect(() => {
      elapsedRef.current = 0;
      if(active){
        startTimer()
      } else {
        clearInterval(timerRef.current);
      }
      return () => {setisPaused(false); return clearInterval(timerRef.current)};
    }, [duration, index, active]);
  
    return (
      <progress value={value} max="100" {...props} className={styles["story-progress"]}></progress>
    );
  });
  export default StoryProgress