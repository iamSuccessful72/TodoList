import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { createTodo, dataRefreshState, TodoDataType } from "../service/service";

function Form() {
  const [formData, setFormData] = useState<TodoDataType>({} as TodoDataType);
  const setDataRefresh = useSetRecoilState(dataRefreshState);

  return (
    <form className="text-bright-gray" onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <span aria-label="required" className="text-torch-red">
          *
        </span>
      </label>
      <input
        aria-placeholder="Enter title of task example (Go get groceries)"
        autoComplete="off"
        className="bg-transparent block border border-bright-gray p-2 rounded w-full"
        id="title"
        name="title"
        onChange={handleChange}
        pattern="([a-zA-Z]|[a-zA-Z]+\W){3,}"
        placeholder="Enter title of task example (Go get groceries)"
        required
        type="text"
        value={formData.title || ""}
      />
      <fieldset className="border border-bright-gray px-2 py-1 rounded">
        <legend>
          Select task category
          <span aria-label="required" className="text-torch-red">
            *
          </span>
        </legend>
        <input
          checked={formData.category === "Personal"}
          id="personal"
          name="category"
          onChange={handleChange}
          required
          type="radio"
          value="Personal"
        />
        <label className="mx-2" htmlFor="personal">
          Personal
        </label>
        <input
          checked={formData.category === "Work"}
          id="work"
          name="category"
          onChange={handleChange}
          type="radio"
          value="Work"
        />
        <label className="mx-2" htmlFor="work">
          Work
        </label>
      </fieldset>
      <div className="flex">
        <div className="basis-2/4 mr-1">
          <label htmlFor="date">
            Date
            <span aria-label="required" className="text-torch-red">
              *
            </span>
          </label>
          <input
            className="bg-transparent block border border-bright-gray p-2 rounded w-full"
            id="date"
            min={new Date().toISOString().slice(0, 10)}
            name="date"
            onChange={handleChange}
            type="date"
            value={formData.date || ""}
          />
        </div>
        <div className="basis-2/4 ml-1">
          <label htmlFor="time">
            Time
            <span aria-label="required" className="text-torch-red">
              *
            </span>
          </label>
          <input
            className="bg-transparent block border border-bright-gray p-2 rounded w-full"
            id="time"
            name="time"
            onChange={handleChange}
            type="time"
            value={formData.time || ""}
          />
        </div>
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        aria-placeholder="Enter description Example (Buy two bottles of milk and 6 eggs) from the store"
        autoComplete="off"
        className="bg-transparent block border border-bright-gray p-2 resize-none rounded w-full"
        id="description"
        name="description"
        onChange={handleChange}
        placeholder="Enter description Example (Buy two bottles of milk and 6 eggs) from the store"
        rows={5}
        value={formData.description || ""}
      ></textarea>
      <div className="flex justify-end py-2">
        <button
          className="bg-bright-gray p-2 rounded text-rock-blue"
          type="submit"
        >
          Create Task
        </button>
      </div>
    </form>
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ): void {
    const name: string = event.target.name;
    const value: string = event.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const task: TodoDataType = {
      category: formData.category,
      complete: false,
      date: formData.date,
      description: formData.description,
      taskId: Math.random().toString(36).slice(0, 9),
      time: formData.time,
      title: formData.title,
    };
    createTodo(task);
    setFormData({
      category: "",
      complete: false,
      date: "",
      description: "",
      taskId: "",
      time: "",
      title: "",
    });
    setDataRefresh(true);
  }
}

export default Form;
