import { lazy, Suspense } from 'react';
import { GlobalStyle } from './styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { fetcher } from '@/services';
import ErrorBoundary from './ErrorBoundary';
import { Loading, Alert } from '@/components';

const UserDetails = lazy(() =>
  import('@/pages/UserDetails/UserDetails').then(module => ({
    default: module.UserDetails,
  }))
);

const UserList = lazy(() =>
  import('@/pages/UserList/UserList').then(module => ({
    default: module.UserList,
  }))
);

export function App(): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher,
        suspense: true,
        revalidateOnFocus: true
      }}
    >
      <ErrorBoundary fallback={<Alert type="error" component="h1">Sorry, there was an error. Try refreshing the page again.</Alert>}>
        <Suspense fallback={<Loading />}>
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
