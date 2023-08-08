import "./LoginForm.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginForm.css";
export default function LoginForm({ setAppState, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, form);
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      // console.log("token", token);
      /*
      {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      }*/
      console.log(localStorage.getItem("token"));
      if (res?.data) {
        setAppState(res.data);
        setIsLoading(false);
        navigate("/userpreferences");
        console.log("hey it works");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        setIsLoading(false);
      }
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      setIsLoading(false);
    }
  };
  // mt-10 sm:mx-auto sm:w-full sm:max-w-sm
  //bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#044389]">
          Login Here
        </h2>
        <br />

        <img
          className="mx-auto h-10 w-auto"
          src="images/sheep.png"
          alt="Your Company"
        ></img>

        <br />

        <div className="space-y-6" action="#" method="POST">
          <div className="input-field">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="email"
            >
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleOnInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-[14px] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label
              className="block text-sm font-medium leading-6 text-gray-900"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleOnInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-[14px] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button
            className="flex w-full justify-center rounded-md bg-[#044389] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#E4FAEE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isLoading}
            onClick={handleOnSubmit}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className="footer">
          <p className="mt-10 text-center text-sm text-[#044389]">
            Don't have an account? <Link to="/register"> Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
