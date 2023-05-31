import { atom, selector } from  "recoil";
import localforage from "localforage";

export interface TodoDataType {
    category: "Personal" | "Work" | "";
    complete: boolean;
    date: string;
    description: string;
    taskId: string;
    time: string;
    title: string;
};

export type TodoListType = TodoDataType[];

export const dataRefreshState = atom<boolean>({
    default: true,
    key: "dataRefreshState"
})

export const todoListFilterState = atom<string>({
    default: "All",
    key: "todoListFilterState"
})

export const todoListState = atom<TodoListType>({
    default: [],
    key: "todoListState"
})

export const filteredTodoListState = selector<TodoListType>({
    get: ({get}) => {
        const filter = get(todoListFilterState)
        const list = get(todoListState);

        switch (filter) {
            case "Completed": 
               return list.filter(tasks => tasks.complete === true);
            case "Pending": 
               return list.filter(tasks => tasks.complete === false);
            case "Personal": 
               return list.filter(tasks => tasks.category === "Personal");
            case "Work": 
               return list.filter(tasks => tasks.category === "Work");
            default:
                return list            
        }
    },
    key: "filteredTodoListState"
})

// localforage methods

function set(todos: TodoListType) {
    return localforage.setItem("todos", todos)
}

export async function getTodos(): Promise<TodoListType> {
    let tasks = await localforage.getItem("todos") as TodoListType;
    if (!tasks) tasks = []; 
    return tasks;
}

export async function createTodo(task: TodoDataType): Promise<TodoListType> {
    const tasks = await getTodos();
    tasks.unshift(task);
    await set(tasks);
    return tasks;
}

export async function deleteTodo(todo: TodoDataType): Promise<TodoListType> {
    const tasks = await getTodos();
    const taskId = tasks.findIndex(task => task.taskId === todo.taskId);
    const update = modify(tasks, taskId);
    await set(update);
    return update;
}

export async function deleteAllTodo(): Promise<TodoListType> {
    const tasks = await getTodos();
    const update = deleteAll(tasks);
    await set(tasks);
    return tasks;
    update;
}

export async function editTodo(todo: TodoDataType): Promise<TodoListType> {
    const tasks = await getTodos();
    const taskId = tasks.findIndex(task => task.taskId === todo.taskId);
    const update = edit(tasks, taskId, todo);
    await set(update);
    return update;
}

function deleteAll(arr: TodoListType): TodoListType {
    return arr.splice(0, arr.length);
}

function edit(arr: TodoListType, index: number, task: TodoDataType): TodoListType {
    return [...arr.slice(0, index), task, ...arr.slice(index + 1)];
}

function modify(arr: TodoListType, index: number): TodoListType {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}