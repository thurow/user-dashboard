import { GlobalStyle } from './styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import { UserList } from './pages';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact>
          <UserList />
        </Route>
        <Route path="/user/:id">
          <>user details</>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
