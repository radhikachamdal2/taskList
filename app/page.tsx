import Image from "next/image";
import styles from "./page.module.css";
import TaskDashboard from "./taskDashboard";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <TaskDashboard />
      <footer className={styles.footer}></footer>
    </div>
  );
}
