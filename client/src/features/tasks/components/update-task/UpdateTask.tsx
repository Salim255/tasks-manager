import { useDispatch } from "react-redux";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import "./_update-task.scss";
import type { AppDispatch } from "recharts/types/state/store";
import { closeEditTaskModal } from "../../states/taskSlice";
import { IoMdClose } from "react-icons/io";

export const UpdateTask = () => {
    const dispatch = useDispatch<AppDispatch>();
    const closeModal = () => {
        dispatch(closeEditTaskModal());
    }


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

const members = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "David Brown" },
  { id: "4", name: "Emma Wilson" },
];
    return (
    <ModalOverlay onClose={closeModal}>
  <div
    data-modal-body
    className="update-task"
  >
    {/* Header */}
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

    {/* Form */}
    <form className="update-task__form">

      <div className="update-task__body">

        <div className="update-task__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="form__input"
          />
        </div>

        <div className="update-task__field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form__textarea"
          />
        </div>

        <div className="update-task__grid">
          <div className="update-task__field">
            <label>Type</label>
            <select className="form__select" >
              {
                taskTypes.map(type => (
                  <option
                    key={type.value}
                    value={type.value}
                  >
                    {type.label}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="update-task__field">
            <label>Status</label>
            <select className="form__select" >
               {
                taskStatuses.map(status => (
                  <option
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </option>
                ))
                }
            </select>
          </div>

          <div className="update-task__field">
            <label>Priority</label>
            <select className="form__select" >
                {
                  taskPriorities.map(priority => (
                  <option
                    key={priority.value}
                    value={priority.value}
                  >
                    {priority.label}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        <div className="update-task__grid">
          <div className="update-task__field">
            <label>Assignee</label>
            <select className="form__select">
              {
                members.map(member => (
                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.name}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="update-task__field">
            <label>Due Date</label>
            <input
              type="date"
              className="form__input"
            />
          </div>
        </div>

      </div>

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