import { useRecoilState } from "recoil";
import { todoListFilterState } from "../service/service";

function FilterTodo() {
  const [todoFilter, setTodoFilter] = useRecoilState(todoListFilterState);

  return (
    <select
      className="bg-transparent mb-2"
      onChange={handleChange}
      value={todoFilter}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Pending">Pending</option>
      <option value="Personal">Personal</option>
      <option value="Work">Work</option>
    </select>
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setTodoFilter(event.target.value);
  }
}

export default FilterTodo;
