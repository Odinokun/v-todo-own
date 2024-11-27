import { FilterValuesType, TaskType } from './App';
import { Button } from './Button';

type PropsType = {
  title: string;
  tasks?: TaskType[];
  date?: string;
  filterTasks: (filter: FilterValuesType) => void;
  removeTask: (taskId: number) => void;
};

export const Todolist = ({
  title,
  tasks,
  date,
  filterTasks,
  removeTask,
}: PropsType) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title='+' callBack={() => {}} />
      </div>
      <br />

      <div>
        <Button title='All' callBack={() => filterTasks('all')} />
        <Button title='Active' callBack={() => filterTasks('active')} />
        <Button title='Completed' callBack={() => filterTasks('completed')} />
      </div>

      <ul>
        {tasks ? (
          tasks.map(t => (
            <li key={t.id}>
              <Button title='del' callBack={() => removeTask(t.id)} />
              <input type='checkbox' checked={t.isDone} />
              <span>{t.title}</span>
            </li>
          ))
        ) : (
          <li>We have no tasks</li>
        )}
      </ul>

      {date ? <div>Current date - {date} </div> : null}
    </div>
  );
};
