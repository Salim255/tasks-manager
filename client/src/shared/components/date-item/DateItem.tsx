import "./_date-item.scss";
import { formatDate } from "../../utils/methods";

export const DateItem = ({date}: {date: string | null}) => {
    return  <span className="date-item">
      {date ? formatDate(date) : "-"}
    </span>
}