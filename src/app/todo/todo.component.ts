import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Todo } from "../todo";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  editable: boolean = false;

  @Input() todo!: Todo;
  @Output() removeTodo = new EventEmitter<Todo>();
  @Output() updateTodo = new EventEmitter<Todo>();
  
  onUpdateTodo = (title: string, description?: string): void => {
    if (!title) return

    this.editable = false;
    const updateTodoFormData = {
      id: this.todo.id,
      title: title,
      description: description,
      done: this.todo.done
    }

    this.updateTodo.emit(updateTodoFormData);
  }
}
