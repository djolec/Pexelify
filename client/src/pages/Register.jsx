import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemeBtn from "../ui/ThemeBtn";
import useRegister from "../features/authentication/useRegister";
import useCheckAvailability from "../features/authentication/useCheckAvailability.js";
import useDebouncedCallback from "../hooks/useDebouncedHook.js";
import Check from "../assets/svg/check.svg?react";
import False from "../assets/svg/false.svg?react";
import emailRegex from "../constants/emailRegex.js";
import LoaderSmall from "../ui/LoaderSmall.jsx";
import PexelifyBanner from "../ui/PexelifyBanner.jsx";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(emailRegex, "Username must be a valid email")
    .required("Please enter your email")
    .min(4, "The username must be at least 4 characters long"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 characters long"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [message, setMessage] = useState({ status: "", text: "" });
  const { register, isRegistering } = useRegister();

  const { checkAvailability } = useCheckAvailability();

  const setDebouncedUsername = useDebouncedCallback((username) => {
    checkAvailability(username, {
      onSuccess: () => {
        setMessage({ status: "success", text: "username available" });
      },
      onError: (error) => {
        if (error.status === 409) {
          setMessage({ status: "error", text: "username already taken" });
        }
      },
    });
  }, 1000);

  const handleSubmit = (values, { resetForm }) => {
    const { username, password } = values;
    register(
      { username, password },
      {
        onSuccess: () => {
          resetForm();
          setMessage({ status: "", text: "" });
        },
      },
    );
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-[var(--surface)] pt-[20vh]">
      <div className="absolute right-4 top-4 sm:right-10 sm:top-10">
        <ThemeBtn />
      </div>

      <PexelifyBanner />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="flex w-full flex-col items-center gap-4 px-8 sm:w-72 sm:px-0 2xl:w-[400px] 2xl:gap-6">
              <div className="relative w-full sm:w-fit">
                {message.text && (
                  <div className="absolute bottom-[110%] left-4 flex flex-row items-end gap-[2px]">
                    {message.status === "success" ? (
                      <Check className={`h-3 w-auto fill-green-600`} />
                    ) : message.status === "error" ? (
                      <False className={`h-[13px] w-auto fill-red-600`} />
                    ) : null}

                    <span
                      className={`text-sm leading-4 ${
                        message.status === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                )}

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
                      onKeyUp={() => {
                        setMessage({ status: "", text: "" });
                        if (emailRegex.test(values.username)) {
                          setDebouncedUsername(values.username);
                        }
                      }}
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

              <div className="relative w-full sm:w-fit">
                <Field name="passwordConfirmation">
                  {({ field, form }) => (
                    <input
                      className="w-full rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-base text-[var(--on-background)] outline-none sm:w-72 2xl:w-[400px] 2xl:px-6 2xl:text-2xl"
                      {...field}
                      type="password"
                      id="passwordConfirmation"
                      placeholder="Confirm your password"
                      autoComplete="off"
                      onKeyDown={() =>
                        form.setFieldTouched("passwordConfirmation")
                      }
                    />
                  )}
                </Field>

                <ErrorMessage name="passwordConfirmation">
                  {(msg) => (
                    <p className="left-[105%] top-1/2 w-60 pl-4 text-sm text-red-600 sm:absolute sm:-translate-y-1/2 sm:pl-0 2xl:text-xl">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <button
                className="relative h-10 w-full rounded-full bg-[var(--primary)] px-4 py-2 text-base text-[var(--on-primary)] disabled:cursor-not-allowed 2xl:h-12 2xl:text-2xl"
                type="submit"
                disabled={isRegistering}
              >
                {isRegistering ? <LoaderSmall /> : "Register"}
              </button>
            </Form>
          );
        }}
      </Formik>

      <p className="mt-2 w-full px-12 text-base text-[var(--on-background)] sm:w-72 sm:px-4 2xl:w-[400px] 2xl:px-6 2xl:text-xl">
        Already have an account?
        <br />
        <span className="text-base text-[var(--primary)] underline 2xl:text-xl">
          <Link to="/login">Sign in</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
