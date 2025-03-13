import React, { ReactNode } from "react";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <StoreProvider>
      {children}
      <Toaster />
    </StoreProvider>
  );
};

export default Providers;
