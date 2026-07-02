import { PropsWithChildren, Suspense } from "react";
import { ToastContainer } from "react-toastify";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
      <ToastContainer />
    </Suspense>
  );
}