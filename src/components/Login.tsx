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
    console.log("setting username to: " + event.target.value);
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }
    
    private async handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
    }

  render() {
    return (
      <div>
        <h2> Please login</h2>
        <form>
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
      </div>
    );
  }
}
