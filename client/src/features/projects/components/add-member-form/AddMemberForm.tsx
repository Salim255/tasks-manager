import "./_add-member-form.scss";
import { GoPersonAdd } from "react-icons/go";
import { useSelectProjects } from "../../states/projectsSelectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { onAddMemberModal } from "../../states/projectSlice";
import { IoMdClose } from "react-icons/io";

export const AddMemberForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAddMember } = useSelectProjects();
    
    const handleAddMemberModal = () => {
        dispatch(onAddMemberModal({ actionType: !isAddMember}));
    }

    useEffect(() => {}, [isAddMember]);

    if (!isAddMember) {
        return  <GoPersonAdd onClick={handleAddMemberModal}/> 
    }
  
    return <ModalOverlay onClose={handleAddMemberModal}>
        <form  className="form add-member-form" data-modal-body>
            <div className="from-row add-member-form__header">
                <h6> Add people to My Scrum Space </h6>
                <button onClick={handleAddMemberModal}><IoMdClose /></button>
            </div>
            <div className="form-row">
                <label className="from-label">Member email</label>
                <input className="form-input" placeholder="salim@gmail.com"></input>
            </div>
            <div className="form-row">
                <label className="from-label">
                    role
                </label>
                <input className="form-input"></input>
            </div>
            <div className="form-row">
                <button className="btn">cancel</button>
                <button className="btn btn-hero" type="submit">add</button>
            </div>
        </form>
    </ModalOverlay>
    
   
}