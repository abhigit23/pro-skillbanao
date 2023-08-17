import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import logo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    phone: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const endpoint =
        userData.role === "professional"
          ? "/professional/login"
          : "/user/login";
      const response = await axios.post(
        `https://skillbanaobe.onrender.com${endpoint}`,
        userData
      );
      if (userData.role === "professional") {
        navigate("/users");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        margin: "20vh auto",
        border: "1px solid lightgrey",
        padding: "20px",
      }}
      initialValues={{ remember: false }}
    >
      <img
        id="logo"
        src={logo}
        alt=""
        style={{ display: "flex", justifyContent: "center" }}
      />
      <h2 className="text-center mb-3">Login</h2>
      <Form.Item
        label="Mobile Number"
        rules={[
          { required: true, message: "Please input your Mobile Number!" },
        ]}
        htmlFor="phone"
      >
        <Input
          type="phone"
          name="phone"
          id="phone"
          onChange={handleInputChange}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          type="password"
          name="password"
          id="password"
          onChange={handleInputChange}
        />
      </Form.Item>

      <Form.Item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Radio.Group
          name="role"
          onChange={handleInputChange}
          value={userData.role}
        >
          <Radio value="user">User</Radio>
          <Radio value="professional">Professional</Radio>
        </Radio.Group>
      </Form.Item>
      <p className="text-center">
        Don't Have an Account? <a href="/signup">Register</a>
      </p>

      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
