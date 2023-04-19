import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    Username: "",
    Password: "",
  });

  const inputUserLogin = (e) => {
    try {
      let { name, value } = e.target;
      setUserLogin({
        ...userLogin,
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SubmitLogin = async () => {
    try {
      // if (userLogin?.Username !== "" && userLogin?.Password !== "") {
      //   if (userLogin?.Username === "123" && userLogin?.Password === "123") {
      //     dispatch({
      //       type: "LOGIN",
      //       payload: {
      //         Username: userLogin?.Username,
      //         Password: userLogin?.Password,
      //       },
      //     });
      //     navigate("/home");
      //   }
      // }
      const res = await axios.post(`http://localhost:3003/users/login`, {
        username: userLogin?.Username,
        password: userLogin?.Password,
      });
      if (res?.data?.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            Username: userLogin?.Username,
            Password: userLogin?.Password,
            fullname: res?.data?.data?.fullname,
            token: res?.data?.data?.token,
          },
        });
        navigate("/home");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <Paper className="box-login" elevation={3}>
        <div className="login-title">Login Form</div>
        <div className="form-login">
          <div className="group-input">
            <div className="label-input">Username</div>
            <Input
              size="large"
              placeholder="Username..."
              name="Username"
              className="Input-login"
              onChange={(e) => {
                inputUserLogin(e);
              }}
            />
          </div>
          <div className="group-input">
            <div className="label-input">Password</div>
            <Input.Password
              size="large"
              placeholder="Password..."
              name="Password"
              className="Input-login"
              onChange={(e) => {
                inputUserLogin(e);
              }}
            />
          </div>
        </div>
        <div className="button-login">
          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={SubmitLogin}
          >
            Login
          </Button>
        </div>
      </Paper>
    </div>
  );
}
