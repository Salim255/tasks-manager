import "./_app-layout.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchProjectsHttp } from "../features/projects/http/project.http";
import { SmallSidebar } from "../features/dashboard/components/small-sidebar/SmallSidebar";
import { Navbar } from "../features/dashboard/components/navbar/Navbar";
import { NavLinks } from "../features/dashboard/components/nav-links/NavLinks";
import { BigSidebar } from "../features/dashboard/components/big-sidebar/BigSidebar";
import { AppBrand } from "./components/app-brand/AppBrand";

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
      <div className="app-layout__aside">
        <div className="app-layout__sm-bar">
        <SmallSidebar />
        </div>

        <div className="app-layout__bg-bar">
          <BigSidebar>
            <AppBrand />
            <NavLinks />
          </BigSidebar>
        </div>
      </div>

      <div className="app-layout__content">
        <Navbar />
        <div className="app-layout__outlet">{children}</div>
      </div>
    </motion.main>
  );
};