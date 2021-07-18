import { GlobalStyle } from './styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserList } from './pages';
import { SWRConfig } from 'swr';
import { fetcher } from './services';
import { Suspense } from 'react';

export function App(): JSX.Element {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
        suspense: true
      }}
    >
      <Suspense fallback={<>Loading...</>}>
        <BrowserRouter>
          <GlobalStyle />
          <Switch>
            <Route path="/" exact>
              <UserList />
            </Route>
            <Route path="/user/:id">
              <>user details</>
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </SWRConfig>
  )
}
