import React, { SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";

interface LoginProps {
  authService: AuthService;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccesful: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}
export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: "",
    password: "",
    loginAttempted: false,
    loginSuccesful: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
    // console.log("setting username to: " + event.target.value);
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }
  // we try to assess a service with this method, so we make it asynchronous
  // we also need to control everything that happens to the component, so we use the prevent.Default()
  // try to get the result from the authentication service
  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    // once the handleSubmit is activated, then we have an Attempted Login turn to true
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    // if you have a result, the login has been succesful, if not the login has been unsuccesful
    if (result) {
      this.setState({ loginSuccesful: true });
    } else {
      this.setState({ loginSuccesful: false });
    }
  }
// if the login has been attempted, and login has been succesful,
    // display message inside of label with "login succesful", if not,
    // display message of "login failed"
  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.loginSuccesful) {
        loginMessage = <label>Login Succesful</label>;
      } else {
        loginMessage = <label>Login Failed</label>;
      }
    }

    return (
      <div>
        <h2> Please login</h2>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            value={this.state.userName}
            onChange={(event) => this.setUserName(event)}
          />
          <br />
          <input
            value={this.state.password}
            onChange={(event) => this.setPassword(event)}
            type="password"
          />
          <br />
          <input type="submit" value="login" />
        </form>
        {loginMessage}
      </div>
    );
  }
}
