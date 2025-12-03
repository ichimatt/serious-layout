import styles from "./page.module.css"

export default function GamePage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.chunk}></div>
      </nav>
      <section className={styles.area}>
        <div className={styles.chunk}></div>
        <div className={styles.chunk}></div>
        <div className={styles.chunk}></div>
      </section>
      <section className={styles.controls}>
        <div className={styles.chunk}></div>
      </section>
    </div>
  )
}
