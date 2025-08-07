import { Toaster } from "../ui/sonner";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Toaster />
      {children}
    </ReactQueryProvider>
  );
}
