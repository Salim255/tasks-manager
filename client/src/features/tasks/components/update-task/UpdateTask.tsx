import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";

import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import { EntityModal } from "../../../../shared/modals/entity-modal/EntityModal";
import { closeEditTaskModal } from "../../states/taskSlice";

import "./_update-task.scss";

import type { AppDispatch } from "recharts/types/state/store";
import { useTaskForm } from "../../form-builder/taskFormBuilder";
import { useSelectedTask } from "../../states/taskSelectors";
import type { UpdateTaskPayload } from "../../http/task.http";
import { addIfChanged } from "../../../../shared/utils/detect-field-change";

export const UpdateTask = () => {
    const dispatch = useDispatch<AppDispatch>();
    const task  = useSelectedTask();
    const { state, setField, reset } = useTaskForm(task);

    const handleChange = (
      event: ChangeEvent<
          HTMLInputElement |
          HTMLSelectElement |
          HTMLTextAreaElement
          >) => {
          setField(
              event.target.name as
              "taskType" | "title" | "description" | "status" | "priority" | "dueAt",
              event.target.value,
          );
      }

      const clickSubmit = (e: ChangeEvent<HTMLFormElement>) => {
          e.preventDefault();
  
          if (!sprint) return;
          
          const payload: UpdateTaskPayload = {
            ...addIfChanged("title", state.title, task?.title),
            ...addIfChanged("status", state.status, task?.status),
            ...addIfChanged("taskType", state.taskType, task?.taskType),
            ...addIfChanged("priority", state.priority, task?.priority),
            ...addIfChanged("assigneeId", state.assigneeId, task?.assigneeId),
            ...addIfChanged("dueAt", state.dueAt, task?.dueAt),
            ...addIfChanged("sprintId", state.sprintId, task?.sprintId),
            ...addIfChanged("description", state.description, task?.description),
          };
  
          dispatch(updateSprintHttp({...payload, sprintId: sprint.id}))
          reset();
      }

    const closeModal = () => {
      dispatch(closeEditTaskModal());
    };

    const [taskType, setTaskType] = useState("task");
    const [taskStatus, setTaskStatus] = useState("todo");
    const [taskPriority, setTaskPriority] = useState("medium");
    const [assigneeId, setAssigneeId] = useState("1");

    const taskTypes = [
        { value: "task", label: "Task" },
        { value: "story", label: "Story" },
        { value: "bug", label: "Bug" },
    ];

    const taskStatuses = [
        { value: "todo", label: "To Do" },
        { value: "in_progress", label: "In Progress" },
        { value: "done", label: "Done" },
    ];

    const taskPriorities = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" },
    ];

    const memberOptions = [
        { value: "1", label: "John Smith" },
        { value: "2", label: "Sarah Johnson" },
        { value: "3", label: "David Brown" },
        { value: "4", label: "Emma Wilson" },
    ];

   return (
    <EntityModal
      title="Update Task"
      description="Modify task details, assignment and workflow status."
      onClose={closeModal}
      actions={{
          cancel: { label: "Cancel", onClick: closeModal },
          submit: { label: "Save Changes", type: "submit" }
        }}
    >
      <form className="form update-task__form">
        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Title
          </label>

          <input
            id="title"
            className="form__input"
            placeholder="Enter task title"
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            className="form__textarea"
            placeholder="Describe the task..."
          />
        </div>

        {/* TYPE / STATUS / PRIORITY */}
        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Type</label>
            <SelectDropdown
              value={taskType}
              options={taskTypes}
              onChange={setTaskType}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Status</label>
            <SelectDropdown
              value={taskStatus}
              options={taskStatuses}
              onChange={setTaskStatus}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Priority</label>
            <SelectDropdown
              value={taskPriority}
              options={taskPriorities}
              onChange={setTaskPriority}
            />
          </div>

        </div>

        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Assignee</label>
            <SelectDropdown
              value={assigneeId}
              options={memberOptions}
              onChange={setAssigneeId}
            />
          </div>

          <div className="form__group">
            <label className="form__label">Due Date</label>
            <input
              type="date"
              className="form__input"
            />
          </div>

        </div>
      </form>
  </EntityModal>
  );
};