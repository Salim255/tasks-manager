import { useRef, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { SelectDropdown } from "../../../../shared/kits/select-dropdown/SelectDropdown";
import { EntityModal } from "../../../../shared/modals/entity-modal/EntityModal";
import { closeEditTaskModal } from "../../states/taskSlice";

import "./_update-task.scss";
import { useTaskForm } from "../../form-builder/taskFormBuilder";
import { useSelectedTask } from "../../states/taskSelectors";
import { updateTasHttp } from "../../http/task.http";
import { removedUnchangedField } from "../../../../shared/utils/detect-field-change";
import type { AppDispatch } from "../../../../redux/store";

export const UpdateTask = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const task  = useSelectedTask();
    const { state, setField, reset } = useTaskForm(task);

    const handleChange = (
      event: ChangeEvent<
          HTMLInputElement |
          HTMLSelectElement |
          HTMLTextAreaElement
          >) => {

          if (event.target.name==="dueAt") {
            setField("dueAt", new Date(event.target.value).toISOString());
          } else {
            setField(
                event.target.name as
                "taskType" | "title" | "description" | "status" | "priority" | "dueAt",
                event.target.value,
            );
          }
      }

      const triggerSubmit = () => {
        formRef?.current?.requestSubmit();
      };

      const clickSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task?.id) return;
        
        const payload = removedUnchangedField(state, task);
        
        // Nothing changed it has always error: {}
        if(Object.keys(payload).length === 1) return;

        dispatch(updateTasHttp({ ...payload, taskId: task.id }));

        //reset();
      }

    const closeModal = () => {
      dispatch(closeEditTaskModal());
    };

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
        submit: { 
          label: "Save Changes", 
          type: "submit", onClick: triggerSubmit, 
          loading: false 
        }
      }}
    >
      <form
        ref={formRef}
        className="form update-task__form"
        onSubmit={clickSubmit}
        >
        <div className="form__group">
          <label className="form__label" htmlFor="title">
            Title
          </label>

          <input
            id="title"
            name="title"
            className="form__input"
            placeholder="Enter task title"
            value={state.title}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="form__textarea"
            placeholder="Describe the task..."
            value={state.description}
            onChange={handleChange}
          />
        </div>

        {/* TYPE / STATUS / PRIORITY */}
        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Type</label>
            <SelectDropdown
              value={state.taskType}
              options={taskTypes}
              onChange={(val) =>
                setField("taskType", val)
              }
            />
          </div>

          <div className="form__group">
            <label className="form__label">Status</label>
            <SelectDropdown
              value={state.status}
              options={taskStatuses}
              onChange={(val) =>
                setField("status", val)
              }
            />
          </div>

          <div className="form__group">
            <label className="form__label">Priority</label>
            <SelectDropdown
              value={state.priority}
              options={taskPriorities}
              onChange={(val) =>
                setField("priority", val)
              }
            />
          </div>

        </div>

        <div className="update-task__grid">

          <div className="form__group">
            <label className="form__label">Assignee</label>
            <SelectDropdown
              value={state.assigneeId}
              options={memberOptions}
              onChange={(val) =>
                setField("assigneeId", val)
              }
            />
          </div>

          <div className="form__group">
            <label className="form__label">Due Date</label>
            <input
              type="date"
              name="dueAt"
              className="form__input"
              value={state.dueAt?.split("T")[0]}
              onChange={handleChange}
            />
          </div>

        </div>
      </form>
  </EntityModal>
  );
};