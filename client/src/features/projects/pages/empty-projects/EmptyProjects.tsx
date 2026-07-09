import "./_empty-projects.scss";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import { NavLink } from "react-router-dom";


export const EmptyProjects = () => {
  return (
    <section className="empty-projects">

      <section className="empty-projects__content">


        <div className="empty-projects__icon">
          <HiOutlineFolderPlus />
        </div>



        <div className="empty-projects__body">

          <h2 className="empty-projects__heading">
            No projects yet
          </h2>


          <p className="empty-projects__description">
            Create a project to define your workspace, invite members and
            start tracking progress.
          </p>



          <NavLink
            to="/create-project"
            className="empty-projects__action"
        
          >
            Create your first project
          </NavLink>

        </div>


      </section>

    </section>
  );
};