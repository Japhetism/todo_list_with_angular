import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Todo } from './todo';
import { TodoComponent } from "./todo/todo.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, TodoComponent],
})
export class AppComponent {
  title = "My To DO List";

  filter: "all" | "active" | "done" = "all";

  todoList: Todo[] = [];

  get todos (): Todo[] {
    return this.filter === "all" ? this.todoList
      : this.todoList.filter((todo: Todo) => this.filter === "done" ? todo.done : !todo.done)
  }

  getTodoId = (): number => {
    return this.todoList.length + 1;
  }

  addTodo = (title: string, description?: string): void => {
    if (!title) return;

    this.todoList.unshift({
      id: this.getTodoId(),
      title: title,
      description: description || "",
      done: false
    });
  }

  removeTodo = (todo: Todo): void => {
    const todoIndex: number = this.todoList.indexOf(todo);

    if (todoIndex !== -1) {
      this.todoList.splice(this.todoList.indexOf(todo), 1);
    }
  }

  updateTodo = (updatedTodo: Todo): void => {
    const todoIndex: number = this.todoList.findIndex((todo: Todo) => todo.id === updatedTodo.id);
    
    if (todoIndex !== -1) {
      this.todoList[todoIndex] = { ...this.todoList[todoIndex], ...updatedTodo}
    }
  }

}
