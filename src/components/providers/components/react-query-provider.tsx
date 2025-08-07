import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({children}: {children?: React.ReactNode}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* React Query Devtools*/}
      <>
        <ReactQueryDevtools initialIsOpen={false} />
      </>
        {/* Application Content */}
      {children}
    </QueryClientProvider>
  );
}
