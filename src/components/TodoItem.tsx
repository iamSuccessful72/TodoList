import { useSetRecoilState } from "recoil";
import {
  deleteTodo,
  editTodo,
  dataRefreshState,
  TodoDataType,
} from "../service/service";

function TodoItem({ todo }: { todo: TodoDataType }) {
  const setDataRefresh = useSetRecoilState(dataRefreshState);

  return (
    <article className="border border-bright-gray mb-2 p-2 rounded text-bright-gray">
      <h2 className="font-bold text-lg">{todo.title.toUpperCase()}</h2>
      {todo.description && (
        <p>
          {todo.description.slice(0, 1).toUpperCase() +
            todo.description.slice(1)}
        </p>
      )}
      <p>
        <span className="font-bold text-rock-blue">Category:</span>
        <span className="ml-2">{todo.category}</span>
      </p>
      <p>
        <span className="font-bold text-rock-blue">Date:</span>
        <time className="ml-2" dateTime={todo.date}>
          {todo.date}
        </time>
      </p>
      <p>
        <span className="font-bold text-rock-blue">Time:</span>
        <time className="ml-2" dateTime={todo.time}>
          {todo.time}
        </time>
      </p>
      <p>
        <span className="font-bold text-rock-blue">Status:</span>
        <span className="ml-2">
          {todo.complete ? "Completed" : "Pending..."}
        </span>
      </p>
      <div className="flex items-center justify-end">
        <div>
          <input
            checked={todo.complete}
            id="status"
            onChange={(event) => toggleStatus(event, todo)}
            type="checkbox"
          />
          <label className="mx-2" htmlFor="status">
            Toggle status
          </label>
        </div>
        <button
          className="p-2 text-torch-red"
          onClick={(event) => handleDelete(event, todo)}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  );

  function toggleStatus(
    event: React.ChangeEvent<HTMLInputElement>,
    task: TodoDataType
  ): void {
    event;
    const newTask: TodoDataType = {
      ...task,
      complete: !task.complete,
    };
    editTodo(newTask);
    setDataRefresh(true);
  }

  function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    task: TodoDataType
  ): void {
    event;
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTodo(task);
      setDataRefresh(true);
    }
  }
}

export default TodoItem;
