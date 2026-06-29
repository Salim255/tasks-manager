// 1 Header with close cross,
// 2 update section
// 3 task details section
import type { AppDispatch } from "recharts/types/state/store";
import "./_task-viewer.scss";
import { useDispatch } from "react-redux";
import { closeTaskViewer } from "../../states/taskSlice";

export const TaskViewer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const onCloseTaskViewer = () => {
        console.log("hello")
        dispatch(closeTaskViewer())
    }

  return (
    <aside className="task-viewer">

      {/* Header */}
      <header className="task-viewer__header">

        <div className="task-viewer__heading">
          <h2 className="task-viewer__title">
            Task Name
          </h2>

          <p className="task-viewer__subtitle">
            View and update task information
          </p>
        </div>

        <button
          type="button"
          className="task-viewer__close"
          aria-label="Close task viewer"
          onClick={onCloseTaskViewer}
        >
          ✕
        </button>

      </header>

      {/* Update Form */}
      <section className="task-viewer__section">

        <h3 className="task-viewer__section-title">
          Update
        </h3>

        <form className="task-viewer__form">

          {/* Form components */}

        </form>

      </section>

      {/* Details */}
      <section className="task-viewer__section">

        <h3 className="task-viewer__section-title">
          Details
        </h3>

        <div className="task-viewer__details">

          {/* Task information */}

        </div>

      </section>

    </aside>
  );
};