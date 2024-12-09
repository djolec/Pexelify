import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import useLogin from "../features/authentication/useLogin";
import { useAuth } from "../context/AuthContext";

import ThemeBtn from "../ui/ThemeBtn";
import { useEffect, useState } from "react";
import emailRegex from "../constants/emailRegex";
import LoaderSmall from "../ui/LoaderSmall";
import PexelifyBanner from "../ui/PexelifyBanner";

const initialValues = {
  username: "pexelify@gmail.com",
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
  const [isWakingServer, setIsWakingServer] = useState(false);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    let timer;

    if (isLoggingIn) {
      timer = setTimeout(() => {
        setIsWakingServer(true);
      }, 5000);
    } else {
      clearTimeout(timer);
      setIsWakingServer(false);
    }

    return () => clearTimeout(timer);
  }, [isLoggingIn]);

  const handleSubmit = ({ username, password }, { resetForm }) => {
    login(
      { username, password },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh]">
      <div className="absolute right-4 top-4 sm:right-10 sm:top-10">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full flex-col items-center gap-4 px-8 sm:w-72 sm:px-0 2xl:w-[400px] 2xl:gap-6">
          <div className="relative w-full sm:w-fit">
            <Field name="username">
              {({ field, form }) => (
                <input
                  className="w-full rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-base text-[var(--on-background)] outline-none sm:w-72 2xl:w-[400px] 2xl:px-6 2xl:text-2xl"
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
                <p className="left-[105%] top-1/2 w-60 pl-4 text-sm text-red-600 sm:absolute sm:-translate-y-1/2 sm:pl-0 2xl:text-xl">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <div className="relative w-full sm:w-fit">
            <Field name="password">
              {({ field, form }) => (
                <input
                  className="w-full rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-base text-[var(--on-background)] outline-none sm:w-72 2xl:w-[400px] 2xl:px-6 2xl:text-2xl"
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
                <p className="left-[105%] top-1/2 w-60 pl-4 text-sm text-red-600 sm:absolute sm:-translate-y-1/2 sm:pl-0 2xl:text-xl">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <span className="-mt-2 w-full pl-4 text-left text-base text-[var(--primary)] underline 2xl:text-xl">
            <Link to="/forgot-password">Forgot password?</Link>
          </span>

          <button
            className="h-10 w-full rounded-full bg-[var(--primary)] px-4 py-2 text-base text-[var(--on-primary)] disabled:cursor-not-allowed 2xl:h-12 2xl:text-2xl"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="flex w-full items-center justify-center">
                <LoaderSmall />
                {isWakingServer && (
                  <span className="ml-1">Waking up the server</span>
                )}
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </Form>
      </Formik>

      <div className="mt-4 flex w-full items-center gap-2 px-12 text-left sm:mt-2 sm:w-72 sm:px-4 2xl:w-[400px] 2xl:px-6">
        <input
          id="trustDevice"
          type="checkbox"
          checked={persist}
          onChange={togglePersist}
        />
        <label
          className="flex w-fit gap-2 text-base text-[var(--on-background)] 2xl:text-xl"
          htmlFor="trustDevice"
        >
          Keep me logged in
        </label>
      </div>

      <p className="mt-2 w-full px-12 text-base text-[var(--on-background)] sm:w-72 sm:px-4 2xl:w-[400px] 2xl:px-6 2xl:text-xl">
        Need an Account?
        <br />
        <span className="text-base text-[var(--primary)] underline 2xl:text-xl">
          <Link to="/register">Register</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
