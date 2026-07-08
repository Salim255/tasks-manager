import "./_add-member-form.scss";
import { BsPersonAdd } from "react-icons/bs";
import { useIsAddMember } from "../../../projects/states/projectsSelectors";
import { useEffect, useRef, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../../../../redux/store";
import { onAddMemberModal } from "../../../projects/states/projectSlice";
import { useMemberForm } from "../../form-builder/memberFormBuilder";
import { addMemberHttp, type CreateMemberPayload } from "../../http/member.http";
import { validateMemberForm } from "../../../../shared/utils/forms-validator";
import { EntityModal } from "../../../../shared/modals/entity-modal/EntityModal";

export const AddMemberForm = ({ projectId }:{ projectId: string }) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { state, setField, reset, setError } =  useMemberForm(projectId);
    const isAddMember = useIsAddMember();
    
    const onClose = () => {
        dispatch(onAddMemberModal());
    }


    const triggerSubmit = () => {
      formRef?.current?.requestSubmit();
    };
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
            <EntityModal
                title="Invite Member"
                description="Add a teammate to collaborate on this project."
                onClose={onClose}
                actions={{
                cancel: { label: "Cancel", onClick: onClose },
                submit: { 
                    label: "Send Invitation", 
                    type: "submit", onClick: triggerSubmit, 
                    loading: false 
                }
                }}
                    >

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    data-modal-body
                    className="add-member-form"
                    >
        
                    <div className="form__group">
                        <label className="form__label">
                        Email Address
                        </label>

                        <input
                        name="memberEmail"
                        value={state.memberEmail}
                        onChange={handleChange}
                        className="form__input"
                        placeholder="john@company.com"
                        />

                        {state.errors.memberEmail && (
                        <p className="form__error">
                            {state.errors.memberEmail}
                        </p>
                        )}
                    </div>

                    <div className="form__group">
                        <label className="form__label">
                        Role
                        </label>

                        <select
                        name="role"
                        value={state.role}
                        onChange={handleChange}
                        className="form__input"
                        >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                        </select>
                    </div>
                </form>
            </EntityModal>
        }
    </div>   
}