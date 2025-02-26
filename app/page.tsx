import TaskDashboard from "./components/taskDashboard/taskDashboard";
import Header from "./components/header/header";

export default function Home() {
  return (
    <div style={{ padding: "1em" }}>
      <Header navigationHeader="Task Board" />
      <main>
        <TaskDashboard />
      </main>
    </div>
  );
}
