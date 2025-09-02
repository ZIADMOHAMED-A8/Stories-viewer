import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from '../Pages/storiespage.module.css'
import Storycircle from "./Storycircle"
import StoryProgress from "./StoryProgress"
import { setIndex, setInIndex } from "../../currentViewedSlice"
import { FaPause, FaPlay } from "react-icons/fa"; // Pause x    = مربعين || , Play = مثلث ▶
export default function StorySlide ({item,index,parentRef}){
    let dispatch=useDispatch()
    let timersRef=useRef([])
    let [isPaused,setisPaused]=useState(false)
    let currentActive=useSelector((state)=> state.current.index)
    let InIndex=useSelector((state)=>state.current.InIndex)
    useEffect(() => {
        if (parentRef?.current && parentRef.current.children[currentActive]) {
          const container = parentRef.current;
          const child = container.children[currentActive];
      
          const containerWidth = container.offsetWidth;
          const childWidth = child.offsetWidth;
          const childLeft = child.offsetLeft;
      
          // احسب الموضع عشان يبقى في النص
          const scrollPosition = childLeft - (containerWidth / 2) + (childWidth / 2);
      
          container.scrollTo({
            left: scrollPosition,
            behavior: "smooth"
          });
        }
      }, [currentActive]);
      
    function handleclick(index){
        dispatch(setIndex({index:index}))
        console.log(parentRef.current.children[index])
        dispatch(setInIndex({InIndex:0}))
 
        
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

{ !isPaused ? <button >  <FaPause onClick={()=>{timersRef.current[InIndex]?.pause();setisPaused(true)}} size={20} style={{backgroundColor:'transparent'}} />
</button>
:
<button >
<FaPlay size={20} onClick={()=>{timersRef.current[InIndex]?.resume();setisPaused(false)}} />
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
<img src={item.stories[InIndex].mediaUrl} alt="coudln't load" onClick={()=>{handleclick(index)}}   />

}





</div>
    )
}