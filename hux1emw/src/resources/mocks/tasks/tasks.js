import { LOG } from "../../../common/utilities/logger";
import tasksData from "./tasks.json";

export const generateMockTasks = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Current month

  const updatedTasks = tasksData.map((task) => {
    const taskDate = new Date(task.date);
    return {
      ...task,
      date: `${year}-${month.toString().padStart(2, "0")}-${taskDate.getDate().toString().padStart(2, "0")}`,
    };
  });

  LOG.info(`Generated mock tasks are: ${JSON.stringify(updatedTasks)}`);
  return updatedTasks;
};
