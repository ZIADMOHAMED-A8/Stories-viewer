import { useNavigate } from "react-router-dom";
import Storycircle from "../Components/Storycircle";
import styles from './stylesview.module.css'

export default function Storiesview(){
let nav=useNavigate()
    function handleclick(){
        nav('/stories/1')
}
    return (
        <div className={styles.stories_section}>
       { ['ahmed','mohamed','ziad','etto'].map((item)=>
        <Storycircle onClick={handleclick} ></Storycircle>
        )
    }
        </div>
    )
}