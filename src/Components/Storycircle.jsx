import styles from "./Storycircle.module.css"
export default function Storycircle({back,...props}){
    return (
        <div {...props} className={styles.story_circle} style={{backgroundImage:`url(${back})`}}></div>
    )
}