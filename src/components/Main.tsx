import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dataRefreshState,
  deleteAllTodo,
  filteredTodoListState,
  getTodos,
  todoListState,
} from "../service/service";
import FilterTodo from "./FilterTodo";
import Form from "./Form";
import TodoItem from "./TodoItem";

function Main() {
  const [dataRefresh, setDataRefresh] = useRecoilState(dataRefreshState);
  const filteredTodo = useRecoilValue(filteredTodoListState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    let mounted: boolean = true;
    if (!dataRefresh && todoList.length) {
      return;
    } else {
      if (mounted) {
        getTodos().then((data) => setTodoList(data));
      }
    }
    return () => {
      mounted = false;
    };
  }, [dataRefresh, todoList]);

  useEffect(() => {
    if (dataRefresh) {
      setTimeout(() => setDataRefresh(false), 1000);
    }
  }, [dataRefresh]);

  return (
    <main className="p-2">
      <section className="lg:w-3/4 mx-auto 2xl:w-2/4" role="region">
        <Form />
        {filteredTodo.length ? (
          <div>
            <FilterTodo />
            {filteredTodo.map((todo) => (
              <TodoItem key={todo.taskId} todo={todo} />
            ))}
          </div>
        ) : (
          <p className="text-torch-red">Your todo list is empty!!</p>
        )}
        {filteredTodo.length > 1 ? (
          <button
            className="bg-torch-red p-2 rounded text-zircon"
            onClick={handleDeletAll}
            type="button"
          >
            Delete All
          </button>
        ) : null}
      </section>
    </main>
  );

  function handleDeletAll(event: React.MouseEvent<HTMLButtonElement>): void {
    event;
    if (confirm("Are you sure you want to delete all tasks?")) {
      deleteAllTodo();
      setDataRefresh(true);
    }
  }
}

export default Main;
