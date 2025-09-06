import { useNavigate } from "react-router-dom";
import Storycircle from "../Components/Storycircle";
import styles from './stylesview.module.css'
import { useGetUsersQuery } from "../../storiesSlice";

export default function Storiesview(){
let nav=useNavigate()
let {data,isLoading}=useGetUsersQuery()
    function handleclick(index){
        console.log(index)
        nav(`/stories/${index}`)
}
if(isLoading){
    return (
        <p>loading</p>
    )
}
    return (
<>
<div className={styles.stories_section}>
       { data.map((item,index)=>
        <Storycircle back={item.avatar} onClick={()=>{
            handleclick(index)
        }} ></Storycircle>
        )
    }
 
        </div>
    <hr></hr>
    </>
)
}