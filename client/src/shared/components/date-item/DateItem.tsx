import "./_date-item.scss";
import { formatDate } from "../../utils/methods";

export const DateItem = ({date}: {date?: string}) => {
    return  <span className="date-item">
      {date ? formatDate(date) : "-"}
    </span>
}