import { type  PropsWithChildren, Suspense } from "react";
import { ToastContainer } from "react-toastify";

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    // Suspense will show the fallback while any lazy-loaded component is still loading
    <Suspense fallback={<div>Loading...</div>}>
      {children}
      <ToastContainer />
    </Suspense>
  );
}