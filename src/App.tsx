import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Unit tests', isDone: true },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  function tasksFilter(): TaskType[] {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isDone);
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }
  }
  const filteredTasksArr = tasksFilter();

  return (
    <div className=''>
      <Todolist
        title={'What to learn'}
        tasks={filteredTasksArr}
        date={new Date().toLocaleDateString()}
        addTask={addTask}
        removeTask={removeTask}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
