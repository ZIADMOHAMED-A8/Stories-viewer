
import styles from './storiespage.module.css'
import imgsrc from '../assets/538982049_18643490536056421_7902493056508838758_n.jpg'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Storycircle from '../Components/Storycircle'
import { useGetStoriesQuery, useGetUsersQuery } from '../../storiesSlice'
import StoryProgress from '../Components/StoryProgress'
import { useDispatch, useSelector } from 'react-redux'
import { setIndex, setInIndex } from '../../currentViewedSlice'
import { FaPause, FaPlay } from "react-icons/fa"; // Pause = مربعين || , Play = مثلث ▶
import StorySlide from '../Components/StorySlide'
import { useNavigate, useParams } from 'react-router-dom'

export default function Storiespage(){
    let {data,isLoading}=useGetUsersQuery()
    let dispatch=useDispatch()
    let parentRef=useRef(null)
    let nav=useNavigate()
    let id=useParams('id')
    useEffect(()=>{
        dispatch(setIndex({index:+id.id}))
        console.log(id.id)
    })
    useEffect(()=>{
        console.log(data)
        return ()=>{
            dispatch(setIndex({index:0}))
            dispatch(setInIndex({InIndex:0}))

        }
    },[isLoading])

    return(
        <div className={styles.overlay}>
            {isLoading ? <p style={{color:'white'}}>loading</p> : 
            
            <>
            
                   <div className={styles.text_content}>
                <p>Stories</p>
                <div  onClick={()=>{
                    nav('/')
                }}>X</div>
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