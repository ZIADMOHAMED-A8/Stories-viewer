import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from '../Pages/storiespage.module.css'
import Storycircle from "./Storycircle"
import StoryProgress from "./StoryProgress"
import { resetInIndex, setIndex, setInIndex } from "../../currentViewedSlice"
import { FaPause, FaPlay } from "react-icons/fa";
export default function StorySlide ({item,index,parentRef}){
    let dispatch=useDispatch()
    let timersRef=useRef([])
    let [isPaused,setisPaused]=useState(false)
    let currentActive=useSelector((state)=> state.current.index)
    let InIndex=useSelector((state)=>state.current.InIndex)
    const safeInIndex = InIndex ?? 0
    
    useEffect(() => {
      if (parentRef?.current && parentRef.current.children[currentActive]) {
        parentRef?.current.scrollTo({
          inline:'center',
          behavior: "smooth"
        });
      }
      dispatch(setInIndex({ InIndex: 0 }));
      if (timersRef.current[0]) {
        timersRef.current[0].reset();
      }
    }, [currentActive]);
    
    useEffect(() => {
      timersRef.current.forEach((timer, i) => {
        if (timer && timer.pause) {
          if (i !== safeInIndex) {
            timer.pause();
          }
        }
      });
      
      if (timersRef.current[safeInIndex]) {
        timersRef.current[safeInIndex].resume();
      }
    }, [InIndex, safeInIndex]);
        
    function handleclick(index){
        dispatch(setIndex({index:index}))
        dispatch(setInIndex({InIndex:0}))

        console.log(parentRef.current.children[index])
    }
    
    function tooglePause(){
        setisPaused((isPaused)=>!isPaused)
    }
    
    return(
        <div className={index ==currentActive ? styles.active : ''}>
{index ==currentActive &&
    < div style={{
        position:'absolute',
        display:'flex',
        gap:'5px',
        width:'95%',
        left:'10px'
        ,top:'10px'
    }}>
   {item.stories.map((story, i) => (
  <StoryProgress
    key={i}
    ref={(el) => {
      if (el) {
        timersRef.current[i] = el;
      }
    }}
    active={i === InIndex}
    setisPaused={setisPaused}
    parentRef={parentRef}
  />
))}
    
    </div>

}
{index===currentActive &&
<div style={{
 display:'flex',
 position:'absolute',
 fill:'red',
 right:'10px'
 ,top:'40px'
}}>

{ !isPaused ? <button >  <FaPause onClick={()=>{timersRef.current[safeInIndex]?.pause();setisPaused(true)}} size={20} style={{backgroundColor:'transparent'}} />
</button>
:
<button >
<FaPlay size={20} onClick={()=>{timersRef.current[safeInIndex]?.resume();setisPaused(false)}} />
</button>
}


</div>
}  

{index !==currentActive && <div  style={{
    display:'flex',
    gap:'5px',
    zIndex:'5',
    flexDirection:'column',
    position:'absolute',
    top:'30%',
    color:'white',
    left:'50%',
    textAlign:'center',
    pointerEvents:'none',
    transform:'translate(-50%)'
}}>
    <Storycircle back={item.avatar}></Storycircle>
    <p>{item.username}</p>

</div>}
{console.log(item.stories)}
{index!==currentActive ? <img src={item.stories[0].mediaUrl} alt="coudln't load" onClick={()=>{handleclick(index)}}   />


:
<img src={item.stories[safeInIndex]?.mediaUrl} alt="coudln't load" onClick={()=>{handleclick(index)}}   />

}



</div>
    )
}