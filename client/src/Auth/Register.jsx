import React, { useState, useEffect } from 'react';
import { Card, Flex, Typography, Form, Input, Button, Alert, Spin } from "antd";
import { Link } from "react-router-dom";
import registerImage from "../assets/pose_51.png";
import useSignup from '../hooks/useSignup';

const Register = () => {
  const { loading, error, registerUser } = useSignup();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <div>
      <header className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 rounded-md text-white bg-gray-800 dark:bg-gray-300 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-500 transition-all"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      <Card className="form-container max-w-6xl mx-auto shadow-md">
        <Flex wrap="wrap" gap="large" align="center" justify="center">
          <Flex vertical flex="1 1 300px" style={{ minWidth: "280px" }}>
            <Typography.Title level={3} strong>
              Create an account
            </Typography.Title>
            <Typography.Text type="secondary" strong>
              Join for exclusive access!
            </Typography.Text>
            <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
              <Form.Item
                label="Full name"
                name="name"
                rules={[{ required: true, message: "Enter your full name" }]}
              >
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Enter email" },
                  { type: "email", message: "The input is not valid" }
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Enter password" }]}
              >
                <Input.Password placeholder="Enter your password" size="large" />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: "Enter confirm password" }]}
              >
                <Input.Password placeholder="Re-enter your password" size="large" />
              </Form.Item>
              {error && <Alert description={error} type="error" showIcon closable />}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className="btn w-full">
                  {loading ? <Spin /> : "Create account"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button type="default" size="large" className="btn w-full">
                    Already have an account?
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
          <Flex flex="1 1 300px" justify="center" className="hidden md:flex">
            <img src={registerImage} className="auth-image max-w-full h-auto" alt="Register" />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Register;
