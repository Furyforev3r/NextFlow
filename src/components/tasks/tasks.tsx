import styles from './tasks.module.css'

export default function Task(props: any) {
  return (
    <>
      <div className={styles.task}>
        <p>{props.value}</p>
      </div>
    </>
  )
}
