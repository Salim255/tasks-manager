import "../features/dashboard/_dashboard.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiScrum } from "react-icons/di";
import { motion } from "motion/react";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProjectsHttp } from "../features/projects/http/project.http";
import { SmallSidebar } from "../features/dashboard/components/small-sidebar/SmallSidebar";
import { Navbar } from "../features/dashboard/components/navbar/Navbar";
import { NavLinks } from "../features/dashboard/components/nav-links/NavLinks";
import { BigSidebar } from "../features/dashboard/components/big-sidebar/BigSidebar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSideBarIsOpen } = useSelector((store: RootState) => store.dashboard);

  useEffect(() => {
    dispatch(fetchProjectsHttp());
  }, [dispatch]);

  return (
    <motion.main
      className={`app-layout ${
        isSideBarIsOpen ? "app-layout--sidebar-open" : "app-layout--sidebar-closed"
      }`}
    >
      <aside className="app-layout__aside">
        <div className="app-layout__sm-bar">
          <SmallSidebar />
        </div>

        <div className="app-layout__bg-bar">
          <BigSidebar>
        
            <NavLinks />
          </BigSidebar>
        </div>
      </aside>

      <div className="dashboard__content">
        <Navbar />
        <div className="dashboard__outlet">{children}</div>
      </div>
    </motion.main>
  );
};