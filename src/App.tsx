import { GlobalStyle } from './styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserDetails, UserList } from './pages';
import { SWRConfig } from 'swr';
import { fetcher } from './services';
import { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

export function App(): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher,
        suspense: true,
        revalidateOnFocus: true
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<>Loading...</>}>
          <BrowserRouter>
            <GlobalStyle />
            <Switch>
              <Route path="/" exact>
                <UserList />
              </Route>
              <Route path="/users/:id">
                <UserDetails />
              </Route>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </SWRConfig>
  )
}
