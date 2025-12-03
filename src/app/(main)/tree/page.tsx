import Tree from "./_components/Tree";
import styles from "./page.module.css";

const demoHistorySteps = [
  "above",
  "above",
  "below",
  "above",
  "below",
  "below",
  "above",
  "below",
  "above",
  "below",
  "above",
] as const;

const demoGoalSteps = ["above", "above", "above", "below"] as const;

export default function TreePage() {
  return (
    <main className={styles.page}>
      {/* <h1 className={styles.title}>
        <span>Learn to make better decisions</span>
        <span>by actually making decisions</span>
      </h1> */}
      <Tree historySteps={demoHistorySteps} goalSteps={demoGoalSteps} />
    </main>
  );
}
