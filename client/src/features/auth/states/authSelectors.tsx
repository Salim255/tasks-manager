import {  useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const selectUser = (state: RootState) => !!state.authReducer.user;
export const useIsAuthenticated = () => useSelector(selectUser);