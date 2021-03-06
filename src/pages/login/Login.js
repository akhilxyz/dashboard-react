import React, { Component } from "react";
import "react-notifications/lib/notifications.css";
import Routes from "../../routes/index";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import auth from "./auth";
import AuthUserRoute from "../../api/auth";
import signin from "../../assets/img/signin.png";

class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("Token");
    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      email: "",
      Password: "",
      rememberMe: false,
      Authenticate: false,
      LoggedIn,
    };
  }

  // ****************** Validation Function *****************************

  ValidateUser = async (e) => {
    e.preventDefault();
    if (!this.state.Password && !this.state.email) {
      NotificationManager.info("Please Enter email and Password", "Info", 2000);
      return false;
    }
    if (!this.state.email) {
      NotificationManager.error("Invalid email", "Error", 2000);
      return;
    }
    if (!this.state.Password) {
      NotificationManager.error("Please Enter Password", "Error", 2000);
      return false;
    } else {
      const resp = await AuthUserRoute({
        email: this.state.email,
        password: this.state.Password,
      });
      console.log("res", resp);
      if (resp) {
        console.log("ok");
        auth.login(() => {
          window.location.reload();
        });
      }
    }
  };

  ResetPassword = () => {
    // TODO : add Reset Function
  };

  // ---------------RENDER----------------------

  render() {
    if (this.state.LoggedIn) {
      auth.login(() => {
        return <Routes />;
      });
    }
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <NotificationContainer />
          <CRow className="justify-content-center">
            <CCol md="5">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <p style={{ textAlign: "center" }}>
                        {" "}
                        <img
                          src={signin}
                          alt="sign in"
                          style={{ maxWidth: "70%", marginBottom: "40px" }}
                        />
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Email"
                          autoComplete="Email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.Password}
                          onChange={(e) =>
                            this.setState({ Password: e.target.value })
                          }
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            onClick={this.ValidateUser}
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
export default Login;
