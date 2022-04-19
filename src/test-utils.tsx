import React, {PropsWithChildren, ReactNode} from "react"
import { render as rtlRender } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function customRender (ui: any, { ...renderOptions }: any = {}) {
  function Wrapper({ children }: PropsWithChildren<ReactNode>) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };