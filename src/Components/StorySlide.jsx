import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from '../Pages/storiespage.module.css'
import Storycircle from "./Storycircle"
import StoryProgress from "./StoryProgress"
import { resetInIndex, setIndex, setInIndex } from "../../currentViewedSlice"
import { FaPause, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export default function StorySlide({item, index, parentRef}){
    let dispatch = useDispatch()
    let timersRef = useRef([])
    let [isPaused, setIsPaused] = useState(false)
    let currentActive = useSelector((state) => state.current.index)
    let InIndex = useSelector((state) => state.current.InIndex)
    const safeInIndex = InIndex ?? 0
    let nav=useNavigate()
    

    
    useEffect(() => {
        if (index === currentActive) {
            setIsPaused(false);
        }
    }, [currentActive, index])

    // When outer story changes: scroll and set inner index to 0. Timer will autoStart.
    useEffect(() => {
        if (index === currentActive) {
            if (parentRef?.current && parentRef.current.children[currentActive]) {
                parentRef.current.children[currentActive].scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                });
            }
            dispatch(setInIndex({ InIndex: 0 }));
        }
    }, [currentActive, index, dispatch, parentRef])

    // When inner story changes: pause others, reset+start current
    useEffect(() => {
        if (index === currentActive && timersRef.current.length > 0) {
            timersRef.current.forEach((timer, i) => {
                if (timer && i !== safeInIndex) {
                    if (timer.pause) timer.pause();
                }
            })
            const currentTimer = timersRef.current[safeInIndex]
            if (currentTimer) {
                if (currentTimer.reset) currentTimer.reset();
                if (currentTimer.start) currentTimer.start();
            }
        }
    }, [InIndex, safeInIndex, index, currentActive])

    const setTimerRef = (i) => (el) => {
        if (el) {
            timersRef.current[i] = el;
        } else if (timersRef.current[i]) {
            timersRef.current[i] = null;
        }
    }
        
    function handleclick(clickedIndex) {
      if(clickedIndex===currentActive){
        togglePause()
        return;
      }
        dispatch(setIndex({ index: clickedIndex }));
        dispatch(setInIndex({ InIndex: 0 }));
        nav(`/stories/${index}`)

        setIsPaused(false);
    }
    
    function togglePause() {
        const newPausedState = !isPaused;
        setIsPaused(newPausedState);
        const currentTimer = timersRef.current[safeInIndex];
        if (currentTimer) {
            if (newPausedState && currentTimer.pause) {
                currentTimer.pause();
            } else if (!newPausedState && currentTimer.resume) {
                currentTimer.resume();
            }
        }
    }
    
    return(
        <div className={index === currentActive ? styles.active : ''}>
            {index === currentActive && (
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    gap: '5px',
                    width: '95%',
                    left: '10px',
                    top: '10px',
                    zIndex: 10
                }}>
                    {item.stories?.map((story, i) => (
                        <StoryProgress
                            key={`story-${index}-${i}`}
                            ref={setTimerRef(i)}
                            active={i === InIndex}
                            autoStart={true}
                            parentRef={parentRef}
                            duration={3000}
                        />
                    ))}
                </div>
            )}

            {index === currentActive && (
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    right: '10px',
                    top: '40px',
                    zIndex: 10
                }}>
                    <button 
                        onClick={togglePause}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        {!isPaused ? (
                            <FaPause size={20} />
                        ) : (
                            <FaPlay size={20} />
                        )}
                    </button>
                </div>
            )}

            {index !== currentActive && (
                <div style={{
                    display: 'flex',
                    gap: '5px',
                    zIndex: '5',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '30%',
                    color: 'white',
                    left: '50%',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    transform: 'translate(-50%)'
                }}>
                    <Storycircle back={item.avatar} />
                    <p>{item.username}</p>
                </div>
            )}

            <img 
                src={index !== currentActive 
                    ? item.stories?.[0]?.mediaUrl 
                    : item.stories?.[safeInIndex]?.mediaUrl
                } 
                alt="couldn't load" 
                onClick={() => handleclick(index)}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
}