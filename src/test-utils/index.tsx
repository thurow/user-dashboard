import { ReactElement } from "react";
import { render, RenderResult } from "@testing-library/react";
import { fetcher } from '@/services';
import { SWRConfig } from "swr";

const Wrapper = ({ children }: { children: ReactElement }) => {
  return <SWRConfig
    value={{
      dedupingInterval: 0,
      fetcher,
      suspense: true
    }}>
      {children}
    </SWRConfig>;
};

const customRender = (ui: ReactElement, options?: any): RenderResult =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";

// override render method
export { customRender as render };
