import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from '../Pages/storiespage.module.css'
import Storycircle from "./Storycircle"
import StoryProgress from "./StoryProgress"
import { setIndex } from "../../currentViewedSlice"
import { FaPause, FaPlay } from "react-icons/fa"; // Pause = مربعين || , Play = مثلث ▶

export default function StorySlide ({item,index,parentRef}){
    let dispatch=useDispatch()
    let timerRef=useRef()
    let [isPaused,setisPaused]=useState(false)
    let currentActive=useSelector((state)=> state.current.index)


    function handleclick(index){
        dispatch(setIndex({index:index}))
        console.log(parentRef.current.children[index])

        parentRef.current.children[index].scrollIntoView({ behavior: "smooth", inline: "center" })
        parentRef.current.children[index].scrollIntoView({ behavior: "smooth", inline: "center" })
        
    }
    function tooglePause(){
        setisPaused((isPaused)=>!isPaused)
    }
    return(
        <div className={index ==currentActive ? styles.active : ''}>
{index ==currentActive &&
    <StoryProgress setisPaused={setisPaused} ref={timerRef} parentRef={parentRef} style={{
        position:'absolute',
        
        width:'95%',
        left:'10px'
        ,top:'10px'
    }}></StoryProgress>

}
{index===currentActive &&
<div style={{
display:'flex',
position:'absolute',
width:'95%',
left:'10px'
,top:'40px'
}}>

{ !isPaused ? <button >  <FaPause onClick={()=>{timerRef.current.pause();setisPaused(true)}} size={20} style={{backgroundColor:'transparent'}} />
</button>
:
<button >
<FaPlay size={20} onClick={()=>{timerRef.current.resume();setisPaused(false)}} />
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

<img src={item.mediaUrl} alt="coudln't load" onClick={()=>{handleclick(index)}}   />




</div>
    )
}