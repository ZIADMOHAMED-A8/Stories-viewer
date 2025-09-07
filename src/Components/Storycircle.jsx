import styles from "./Storycircle.module.css"
export default function Storycircle({name,back,...props}){
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
        <div {...props} className={styles.story_circle} style={{backgroundImage:`url(${back})`}}></div>
        <p style={{color:'white'}}> {name}</p>
        </div>
    )
}