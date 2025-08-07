import { Component } from '@angular/core';
import { TaskService, TaskItem } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: TaskItem[] = [];
  selectedTask: TaskItem | null = null;

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  editTask(task: TaskItem) {
    this.selectedTask = { ...task };
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      if (this.selectedTask?.id === id) {
        this.selectedTask = null;
      }
    });
  }

  onTaskSaved(task: TaskItem) {
    this.loadTasks();
    this.selectedTask = null;
  }
}
