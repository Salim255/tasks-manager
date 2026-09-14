import { DiScrum } from "react-icons/di";
import "./_app-brand.scss";

export const AppBrand = () => {
    return (
        <header className="app-brand">
            <div className="app-brand__identity">

                <div className="app-brand__mark">
                    <span className="app-brand__mark-core">
                        <DiScrum />
                    </span>
                </div>

                <div className="app-brand__content">
                    <div className="app-brand__name">
                        <span>Flow</span>
                        <span className="app-brand__name-accent">Board</span>
                    </div>

                    <div className="app-brand__meta">
                        <span className="app-brand__meta-dot" />
                        <span>Workspace platform</span>
                    </div>
                </div>

            </div>

            <div className="app-brand__status">
                <span className="app-brand__status-line" />
            </div>
        </header>
    );
};