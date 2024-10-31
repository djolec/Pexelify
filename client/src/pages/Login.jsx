import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../features/authentication/useLogin";
import { useAuth } from "../context/AuthContext";

import ThemeBtn from "../ui/ThemeBtn";
import { useEffect } from "react";
import emailRegex from "../constants/emailRegex";
import LoaderSmall from "../ui/LoaderSmall";
import PexelifyBanner from "../ui/PexelifyBanner";

const initialValues = {
  username: "djole_c@hotmail.com",
  password: "123123123",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(emailRegex, "Please enter a valid email")
    .required("Please enter your email")
    .min(4, "The username must be at least 4 characters long"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 characters long"),
});

const Login = () => {
  const { login, isLoggingIn } = useLogin();
  const { persist, setPersist } = useAuth();

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleSubmit = ({ username, password }, { resetForm }) => {
    login(
      { username, password },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh]">
      <div className="absolute sm:right-10 sm:top-10 right-4 top-4">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full sm:w-72 flex-col items-center gap-4 2xl:gap-6 px-8 sm:px-0 2xl:w-[400px]">
          <div className="relative w-full sm:w-fit">
            <Field name="username">
              {({ field, form }) => (
                <input
                  className="w-full sm:w-72 2xl:w-[400px] rounded-full bg-[var(--surface-container-high)] 2xl:text-2xl text-base px-4 2xl:px-6 py-2 text-[var(--on-background)] outline-none"
                  {...field}
                  autoFocus
                  type="email"
                  id="username"
                  placeholder="Email"
                  autoComplete="off"
                  onKeyDown={() => form.setFieldTouched("username")}
                />
              )}
            </Field>

            <ErrorMessage name="username">
              {(msg) => (
                <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0 2xl:text-xl">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <div className="relative w-full sm:w-fit">
            <Field name="password">
              {({ field, form }) => (
                <input
                  className="w-full sm:w-72 2xl:w-[400px] rounded-full bg-[var(--surface-container-high)] 2xl:text-2xl text-base px-4 2xl:px-6 py-2 text-[var(--on-background)] outline-none"
                  {...field}
                  type="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  onKeyDown={() => form.setFieldTouched("password")}
                />
              )}
            </Field>

            <ErrorMessage name="password">
              {(msg) => (
                <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0 2xl:text-xl">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <span className="text-[var(--primary)] underline text-base 2xl:text-xl -mt-2 w-full text-left pl-4">
            <Link to="/forgot-password">Forgot password?</Link>
          </span>

          <button
            className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] h-10 2xl:h-12 2xl:text-2xl text-base disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <LoaderSmall /> : "Log in"}
          </button>
        </Form>
      </Formik>

      <div className="text-left w-full sm:w-72 2xl:w-[400px] px-12 sm:px-4 2xl:px-6 flex items-center gap-2 mt-4 sm:mt-2">
        <input
          id="trustDevice"
          type="checkbox"
          checked={persist}
          onChange={togglePersist}
        />
        <label
          className="text-[var(--on-background)] flex gap-2 w-fit text-base 2xl:text-xl"
          htmlFor="trustDevice"
        >
          Keep me logged in
        </label>
      </div>

      <p className="text-[var(--on-background)] w-full sm:w-72 2xl:w-[400px] mt-2 sm:px-4 2xl:px-6 px-12 text-base 2xl:text-xl">
        Need an Account?
        <br />
        <span className="text-[var(--primary)] underline text-base 2xl:text-xl">
          <Link to="/register">Register</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
