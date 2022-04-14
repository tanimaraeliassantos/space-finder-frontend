import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import history from "../utils/history";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";

interface AppState {
  user: User | undefined;
}
export class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };
    this.setUser = this.setUser.bind(this);
  }

  private setUser(user: User) {
    this.setState({
      user: user,
    });
  }
  render() {
    return (
      <div className="wrapper">
        <Router history={history}>
          <div>
            <Navbar user={this.state.user} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login">
                <Login authService={this.authService} setUser={this.setUser} />
              </Route>
              <Route exact path="/profile">
                <Profile
                  authService={this.authService}
                  user={this.state.user}
                />
              </Route>
              <Route exact path="*" component={notFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function notFound() {
  return <>You have landed on a page that doesn't exist!</>;
}
export default App;
