import { createContext, useContext, useState, type ReactNode } from "react";

// Props
interface ForgetPasswordContextType {
  email: string | null;
  setEmail: (email: string) => void;
  step: number;
  goToStep: (step: number) => void;
}

// Context
const ForgetPasswordContext = createContext<ForgetPasswordContextType | undefined>(undefined);

// States
export const ForgetPasswordProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = new password

  // Functions
  const goToStep = (s: number) => setStep(s);

  return (
    <ForgetPasswordContext.Provider value={{ email, setEmail, step, goToStep }}>
      {children}
    </ForgetPasswordContext.Provider>
  );
};

// Hook to use context
export const useForgetPasswordContext = () => {
  const context = useContext(ForgetPasswordContext);
  if (!context) {
    throw new Error("useForgetPasswordContext must be used within ForgetPasswordProvider");
  }
  return context;
};
