
import styles from './storiespage.module.css'
import imgsrc from '../assets/538982049_18643490536056421_7902493056508838758_n.jpg'
import { useEffect, useRef, useState } from 'react'
import Storycircle from '../Components/Storycircle'
import { useGetStoriesQuery, useGetUsersQuery } from '../../storiesSlice'
import StoryProgress from '../Components/StoryProgress'
import { useDispatch, useSelector } from 'react-redux'
import { setIndex } from '../../currentViewedSlice'
import { FaPause, FaPlay } from "react-icons/fa"; // Pause = مربعين || , Play = مثلث ▶
import StorySlide from '../Components/StorySlide'

export default function Storiespage(){
    let {data,isLoading}=useGetUsersQuery()
    let dispatch=useDispatch()
    let parentRef=useRef(null)

    useEffect(()=>{
        console.log(data)
    },[isLoading])

    return(
        <div className={styles.overlay}>
            {isLoading ? <p style={{color:'white'}}>loading</p> : 
            
            <>
            
                   <div className={styles.text_content}>
                <p>Stories</p>
                <div>X</div>
            </div>
            <div ref={parentRef} className={styles.container}>
             
            {
            
            data.map((item,index)=>
                <StorySlide index={index} parentRef={parentRef}  item={item}></StorySlide>
               )}
            </div></>
            
            }
        </div>
    )
}