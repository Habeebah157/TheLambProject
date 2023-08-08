import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterCard({ setAppState, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsLoading(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    try {
      const res = await axios.post(`http://localhost:3001/auth/register`, {
        userName: form.userName,
        email: form.email,
        password: form.password,
      });
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);

      console.log(localStorage.getItem("token"));
      if (res?.data?.user) {
        setAppState(res.data);
        setIsLoading(false);
        navigate("/userpreferences");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
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
  //bg-gradient-to-r from-yellow-400 via-amber-100 to-amber-500
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold text-[#044389] leading-9 tracking-tight text-[#044389]">
            Register Here
          </h2>

          {errors.form && <span className="error">{errors.form}</span>}
          <br />

          <img
            className="mx-auto h-10 w-auto"
            src="images/sheep.png"
            alt="Your Company"
          ></img>
          <br />

          <div>
            <form className="space-y-6" action="#" method="POST">
              <div className="mt-2">
                <div className="input-field">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="username"
                    value={form.userName}
                    onChange={handleOnInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-[14px] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.userName && (
                    <span className="error">{errors.userName}</span>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <div className="input-field">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
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
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <div className="input-field">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleOnInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-[14px] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <div className="input-field">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="confirm password"
                    value={form.passwordConfirm}
                    onChange={handleOnInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-[#044389] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 pl-[14px] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.passwordConfirm && (
                    <span className="error">{errors.passwordConfirm}</span>
                  )}
                </div>
              </div>

              <br />
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-[#044389] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#044389] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}
                  onClick={handleOnSubmit}
                >
                  {isLoading ? "Loading..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
          <div className="footer">
            <p className="mt-10 text-center text-sm text-[#044389]">
              Already have an account? <Link to="/login"> Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
