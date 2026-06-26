import "./_edit-sprint-date.scss";
import type { Sprint } from "../../../projects/models/sprint.model";
import { FaRegCalendarAlt, FaRegCalendarPlus, FaRegEdit } from "react-icons/fa";
import { formatDate } from "../../../../shared/utils/methods";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { openEditSprintModal } from "../../states/sprintSlice";

export const EditSprintDate = ({sprint}: { sprint: Sprint }) => {
        const dispatch = useDispatch<AppDispatch>();
        const onEditSprintDate = (sprint: Sprint) => {
            dispatch(openEditSprintModal({ sprintId: sprint.id}));
        }      

        return (
              <section className="edit-sprint-header">

    {sprint.startDate && sprint.endDate ? (
      <div
        className="edit-sprint-header__date"
        onClick={() => onEditSprintDate(sprint)}
      >
        <span className="edit-sprint-header__icon">
          <FaRegCalendarAlt />
        </span>

        <span className="edit-sprint-header__value">
          {formatDate(sprint.startDate)} — {formatDate(sprint.endDate)}
        </span>
      </div>
    ) : (
      <button
        type="button"
        className="edit-sprint-header__add-date"
        onClick={() => onEditSprintDate(sprint)}
      >
        <span className="edit-sprint-header__icon">
          <FaRegCalendarPlus />
        </span>

        <span>Add sprint dates</span>
      </button>
    )}

  </section>
        )
}