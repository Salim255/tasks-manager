import {  useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const selectUser = (state: RootState) => !!state.authReducer.user;
export const selectUserData = (state: RootState) => state.authReducer.user;
const selectIsLogout = (state: RootState) => state.authReducer.isLoggingOut;


export const useIsLogout = () =>useSelector(selectIsLogout);
export const useIsAuthenticated = () => useSelector(selectUser);
export const useUserData = () => useSelector(selectUserData);
