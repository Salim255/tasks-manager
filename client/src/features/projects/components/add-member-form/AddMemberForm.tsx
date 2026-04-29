import "./_add-member-form.scss";
import { BsPersonAdd } from "react-icons/bs";
import { useSelectProjects } from "../../states/projectsSelectors";
import { useEffect, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { ModalOverlay } from "../../../../shared/components/modal-overlay/ModalOverlay";
import { onAddMemberModal } from "../../states/projectSlice";
import { IoMdClose } from "react-icons/io";
import { useMemberForm } from "../../forms-builders/memberFormBuilder";
import { addMemberHttp, type CreateMemberPayload } from "../../http/member.http";
import { validateMemberForm } from "../../../../shared/utils/forms-validator";

export const AddMemberForm = ({ projectId }:{ projectId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { state, setField, reset, setError } =  useMemberForm(projectId);
    const { isAddMember } = useSelectProjects();
    
    const onClose = () => {
        dispatch(onAddMemberModal());
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateMemberForm(state);
        if (Object.values(errors).some(Boolean)) {
            Object.entries(errors).forEach(([field, message]) => {
                if (message) setError(field as "memberEmail" | "role", message);
            });
            return;
        }

        if (!state.memberEmail || !state.projectId || !state.role) return;
        const payload: CreateMemberPayload  = {
            email: state.memberEmail,
            role: state.role,
            projectId: state.projectId,
        };
        dispatch(addMemberHttp(payload));
        reset();
    }

    const handleChange = (e:  ChangeEvent<HTMLInputElement |HTMLSelectElement >) => {
        setField(e.target.name as "role" | "memberEmail" , e.target.value);
        if (!state.projectId) setField("projectId", projectId);    
    }

    useEffect(() => {
    }, [isAddMember, projectId]);

    return <div className="add-member-form-container">
        <BsPersonAdd  className="add-member-form-container__close-icon" onClick={onClose}/> 
        {
            isAddMember &&
            <ModalOverlay onClose={onClose}>
                <form 
                    onSubmit={handleSubmit}
                    data-modal-body 
                    className="form add-member-form" >
                    <div className="from-row add-member-form__header">
                        <h5> Add people to My Scrum Space </h5>
                        <div> <IoMdClose onClick={onClose} /> </div>
                    </div>
                    <div className="form-row">
                        <label
                            htmlFor={state.memberEmail} 
                            className="from-label">
                            Member email
                        </label>
                        <input
                            name="memberEmail"
                            value={state.memberEmail}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="salim@gmail.com">
                            </input>
                            { 
                                state.errors.memberEmail && (
                                    <p className="alert-danger">{state.errors.memberEmail}</p>
                                )
                            }
                    </div>
                    <div className="form-row">
                        <label
                            htmlFor={state.role}
                            className="from-label">
                            Member Role
                        </label>
                        <select 
                            name="role"
                            value={state.role}
                            onChange={handleChange}
                            className="form-input">
                                <option value="admin">admin</option>
                                <option value="member">member</option>
                        </select>
                    </div>
                
                    <button className="btn btn-hero form-row" type="submit">add</button>
                </form>
            </ModalOverlay>
        }
    </div>   
}