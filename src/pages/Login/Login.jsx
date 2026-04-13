import React, { useState } from "react";
import { Form, Input, Button, Divider, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ArrowRightOutlined,
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useLoginAdminMutation } from "../../redux/services/authApiService/authApiService";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/features/auth/authSlice";

export default function Login() {
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    try {
      const res = await loginAdmin(values).unwrap();

      // ✅ check success flag first
      if (!res?.success) {
        message.error(res?.message || "Login failed ❌");
        return;
      }

      const user = res?.user;
      const token = res?.token;

      if (!user || !token) {
        message.error("Invalid login response ❌");
        return;
      }

      // ✅ Store only in Redux
      dispatch(setCredentials({ user, token }));

      message.success("Login Successful ✅");

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      message.error(error?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen font-urbanist w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#8A21F9] via-[#7B2CF8]/10 to-[#6535F8]/5">
      {/* mesh blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#8A21F9]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-16 w-80 h-80 bg-[#6535F8]/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-[32rem] h-[32rem] bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* arc lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[900px] h-[420px] border border-white rounded-[100%]"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[1100px] h-[520px] border border-white rounded-[100%]"></div>
      </div>

      {/* login card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-2xl bg-white/15 border border-white/20 shadow-2xl rounded-3xl p-8">
          {/* icon */}
          <div className="flex justify-center mb-5">
            <div className="h-14 w-14 rounded-2xl cursor-pointer bg-purple-600/50 border border-white/30 shadow-lg flex items-center justify-center">
              <ArrowRightOutlined className="text-xl !text-purple-900" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-purple-950">
            Sign in with email
          </h1>

          <p className="text-center text-purple-950 mt-2 text-sm leading-6 mb-3">
            Make a new doc to bring your words, data, and teams together. For
            free
          </p>

          <Form layout="vertical" onFinish={onFinish} className="mt-6">
            {/* Email */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="text-[#3c0366]/70" />}
                placeholder="Email"
                className="!rounded-xl placeholder:text-purple-950 !bg-purple-200 !border-purple-500 !text-[#3c0366] placeholder:!text-[#3c0366]/50 !h-12"
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-[#3c0366]/70" />}
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined className="text-[#3c0366]/70" />
                  ) : (
                    <EyeInvisibleOutlined className="text-[#3c0366]/70" />
                  )
                }
                placeholder="Password"
                className="!rounded-xl !bg-purple-200 !border-purple-500 !text-[#3c0366] placeholder:!text-[#3c0366]/50 !h-12"
              />
            </Form.Item>

            <div className="text-right -mt-2 mb-4">
              <a href="#" className="text-sm !text-purple-950 hover:text-white">
                Forgot password?
              </a>
            </div>

            <Button
              loading={isLoading}
              icon={isLoading ? <LoadingOutlined /> : null}
              htmlType="submit"
              block
              size="large"
              className="!h-12 !rounded-xl !border-0 !text-white !font-medium !bg-gradient-to-r !from-[#8A21F9] !to-[#6535F8] hover:!from-[#7A1DE0] !hover:!to-[#5530E8]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <Divider className="text-purple-950 !text-xs !border-white/20">
            Or sign in with
          </Divider>

          <div className="grid grid-cols-3 gap-3">
            <button className="h-12 rounded-xl bg-purple-400 border border-white/20 flex items-center justify-center text-lg text-white hover:bg-purple-600 cursor-pointer">
              <GoogleOutlined />
            </button>

            <button className="h-12 rounded-xl bg-purple-400 border border-white/20 flex items-center justify-center text-lg text-white hover:bg-purple-600 cursor-pointer">
              <FacebookFilled />
            </button>

            <button className="h-12 rounded-xl bg-purple-400 border border-white/20 flex items-center justify-center text-lg text-white hover:bg-purple-600 cursor-pointer">
              <AppleFilled />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
