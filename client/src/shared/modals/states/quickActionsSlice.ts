import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type QuickActionType =
  | "createTask"
  | "createSprint"
  | "addMember"
  | null;

export type CreateTaskPayload = {
  projectId: string;
  projectName: string;
  projectKey: string;
};

export type CreateSprintPayload = {
  projectId: string;
  projectName: string;
};

export type AddMemberPayload = {
  projectId: string;
  projectName: string;
};

type QuickActionPayloadMap = {
  createTask: CreateTaskPayload;
  createSprint: CreateSprintPayload;
  addMember: AddMemberPayload;
};

type QuickActionState = {
  isOpen: boolean;
  type: QuickActionType;
  data:
    | CreateTaskPayload
    | CreateSprintPayload
    | AddMemberPayload
    | null;
};

const initialState: QuickActionState = {
  isOpen: false,
  type: null,
  data: null
};

const quickActionsSlice = createSlice({
  name: "quickActions",
  initialState,
  reducers: {
    toggleQuickAction: (state) => {
        state.data = null;
        state.type = null;
        state.isOpen = false;
    },
    openCreateTaskModal: (state, action: PayloadAction<CreateTaskPayload>) => {
        state.isOpen = true;
        state.type = "createTask";
        state.data = action.payload;
    },

    openCreateSprintModal: (state, action: PayloadAction<CreateSprintPayload>) => {
        state.isOpen = true;
        state.type = "createSprint";
        state.data = action.payload;
    },

    openAddMemberModal: (
      state,
      action: PayloadAction<AddMemberPayload>
    )=> {
        state.isOpen = true;
        state.type = "addMember";
        state.data = action.payload;
    },

    closeQuickActionModal: (): QuickActionState => ({
      isOpen: false,
      type: null,
      data: null
    })
  }
});

export const {
  toggleQuickAction,
  openCreateTaskModal,
  openCreateSprintModal,
  openAddMemberModal,
  closeQuickActionModal
} = quickActionsSlice.actions;

export default quickActionsSlice.reducer;