
import styles from './storiespage.module.css'
import imgsrc from '../assets/538982049_18643490536056421_7902493056508838758_n.jpg'
import { useRef, useState } from 'react'
import Storycircle from '../Components/Storycircle'
export default function Storiespage(){
    let parentRef=useRef(null)
    let [currentActive,setcurrentActive]=useState(1)
    function handleclick(index){
        setcurrentActive(index)
        parentRef.current.children[index].scrollIntoView({ behavior: "smooth", inline: "center" })
        console.log(1)
   
    }
    return(
        <div className={styles.overlay}>
            <div className={styles.text_content}>
                <p>Stories</p>
                <div>X</div>
            </div>
            <div ref={parentRef} className={styles.container}>
             
            { [imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc,imgsrc].map((item,index)=>
            <div className={index ==currentActive ? styles.active : ''}>
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
                    <Storycircle></Storycircle>
                    <p>CR7</p>

                </div>}
               <img src={item} onClick={()=>{handleclick(index)}}  alt="" />
               </div>
               )}
            </div>
        </div>
    )
}