import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";

import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";

import { closeEditTaskModal } from "../../states/taskSlice";

import "./_update-task.scss";

import type { AppDispatch } from "recharts/types/state/store";

export const UpdateTask = () => {
    const dispatch = useDispatch<AppDispatch>();

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
  <ModalOverlay onClose={closeModal}>
    <div data-modal-body className="update-task">

      {/* ============================================
          HEADER (OUTSIDE FORM)
      ============================================ */}
      <div className="update-task__header">
        <div>
          <h2>Update Task</h2>
          <p>Modify task details, assignment and workflow status.</p>
        </div>

        <button
          type="button"
          className="update-task__close"
          onClick={closeModal}
        >
          <IoMdClose />
        </button>
      </div>

      {/* ============================================
          FORM WRAPPER
      ============================================ */}
      <form className="form update-task__form">

        {/* SCROLLABLE BODY */}
        <div className="update-task__body">

          {/* TITLE */}
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

          {/* DESCRIPTION */}
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

          {/* ASSIGNEE / DUE DATE */}
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

        </div>

        {/* ============================================
            FOOTER (FIXED UX ACTION BAR)
        ============================================ */}
        <div className="update-task__footer">

          <button
            type="button"
            className="update-task__cancel"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-hero update-task__submit"
          >
            Save Changes
          </button>

        </div>

      </form>
    </div>
  </ModalOverlay>
);
};