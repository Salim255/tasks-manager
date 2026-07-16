import { DiScrum } from "react-icons/di";
import "./_app-brand.scss";

export const AppBrand = () => {
    return (
        <header className="app-brand">
            <div className="app-brand__mark">
            <DiScrum />
            </div>

            <div className="app-brand__content">
            <span className="app-brand__label">Plan. Build. Deliver.</span>
            <strong className="app-brand__name">Flowboard</strong>
            </div>
        </header>
    )
}