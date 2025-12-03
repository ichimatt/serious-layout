import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.nav}>edge to edge and position sticky</nav>
        <section className={styles.hero}>
          <h1 className={styles.title}>Scales with Viewport</h1>
        </section>
        <section className={styles.carousel}>
          <div className={styles.model}>
            <div className={styles.modelThumb}>1</div>
            <div className={styles.modelDescription}>
              <div className={styles.modelOverline}>Model</div>
              <h2 className={styles.modelTitle}>Model</h2>
              <div className={styles.modelText}>
                This is a brief description of the lesson to give you a better
                idea of what to expect.
              </div>
            </div>
          </div>
          <div className={styles.model}>
            <div className={styles.modelThumb}>2</div>
            <div className={styles.modelDescription}>
              <div className={styles.modelOverline}>Model</div>
              <h2 className={styles.modelTitle}>Model</h2>
              <div className={styles.modelText}>
                This is a brief description of the lesson to give you a better
                idea of what to expect.
              </div>
            </div>
          </div>
          <div className={styles.model}>
            <div className={styles.modelThumb}>3</div>
            <div className={styles.modelDescription}>
              <div className={styles.modelOverline}>Model</div>
              <h2 className={styles.modelTitle}>Model</h2>
              <div className={styles.modelText}>
                This is a brief description of the lesson to give you a better
                idea of what to expect.
              </div>
            </div>
          </div>
          <div className={styles.model}>
            <div className={styles.modelThumb}>4</div>
            <div className={styles.modelDescription}>
              <div className={styles.modelOverline}>Model</div>
              <h2 className={styles.modelTitle}>Model</h2>
              <div className={styles.modelText}>
                This is a brief description of the lesson to give you a better
                idea of what to expect.
              </div>
            </div>
          </div>
          <div className={styles.model}>
            <div className={styles.modelThumb}>5</div>
            <div className={styles.modelDescription}>
              <div className={styles.modelOverline}>Model</div>
              <h2 className={styles.modelTitle}>Model</h2>
              <div className={styles.modelText}>
                This is a brief description of the lesson to give you a better
                idea of what to expect.
              </div>
            </div>
          </div>
        </section>

        <div className={styles.divider}></div>

        <section className={styles.pitch}>
          <div className={styles.image}>image</div>
          <ul className={styles.list}>
            <li>
              This a list item that lines up neatly with the other content on
              the page. It helps give some structure to the page.
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              This a list item that lines up neatly with the other content on
              the page. It helps give some structure to the page.
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              This a list item that lines up neatly with the other content on
              the page. It helps give some structure to the page.
            </li>
          </ul>
        </section>

        <div className={styles.divider}></div>

        <div className={styles.gutter}>gutter</div>
        <div className={styles.gutter}>gutter</div>
        <div className={styles.inset}>inset</div>
        <div className={styles.inset}>inset</div>
        <div className={styles.columnGap}>column gap</div>
      </main>
    </div>
  );
}
