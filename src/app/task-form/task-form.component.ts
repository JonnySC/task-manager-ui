import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService, TaskItem } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() task: TaskItem | null = null;
  @Output() saved = new EventEmitter<TaskItem>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    });
  }

  ngOnChanges() {
    if (this.task) {
      this.form.patchValue(this.task);
    } else {
      this.form.reset({ isCompleted: false });
    }
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      if (this.task && this.task.id) {
        this.taskService.updateTask(this.task.id, value).subscribe(() => {
          this.saved.emit({ ...this.task, ...value });
        });
      } else {
        this.taskService.createTask(value).subscribe(newTask => {
          this.saved.emit(newTask);
        });
      }
    }
  }
}
