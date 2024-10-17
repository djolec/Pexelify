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
  const { register, isPending } = useRegister();

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
      }
    );
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-[var(--surface)] pt-[20vh] overflow-hidden">
      <div className="absolute sm:right-10 sm:top-10 right-4 top-4">
        <ThemeBtn />
      </div>

      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="flex w-fit flex-row gap-2">
          <h1 className="text-6xl font-semibold text-[var(--primary)] 2xl:text-6xl">
            Pexelify
          </h1>

          <img
            height="250"
            width="250"
            className="h-16 w-auto 2xl:h-[100px]"
            src="/assets/logos/PexelifyLogo.webp"
            alt="Pexelify logo"
          />
        </div>

        <p className="text-[var(--on-background)]">
          Easy access to royalty free photos and videos!
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form className="flex w-full sm:w-72 flex-col items-center gap-4 px-8 sm:px-0">
              <div className="relative w-full sm:w-fit">
                {message.text && (
                  <p className="absolute bottom-full left-4 flex flex-row items-center gap-[2px]">
                    {message.status === "success" ? (
                      <Check className={`h-3 w-auto fill-green-600`} />
                    ) : message.status === "error" ? (
                      <False className={`h-[13px] w-auto fill-red-600`} />
                    ) : null}

                    <span
                      className={`text-sm ${
                        message.status === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message.text}
                    </span>
                  </p>
                )}

                <Field name="username">
                  {({ field, form }) => (
                    <input
                      className="w-full sm:w-72 rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-[var(--on-background)] outline-none"
                      {...field}
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
                    <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <div className="relative w-full sm:w-fit">
                <Field name="password">
                  {({ field, form }) => (
                    <input
                      className="w-full sm:w-72 rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-[var(--on-background)] outline-none"
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
                    <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <div className="relative w-full sm:w-fit">
                <Field name="passwordConfirmation">
                  {({ field, form }) => (
                    <input
                      className="w-full sm:w-72 rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-[var(--on-background)] outline-none"
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
                    <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0">
                      {msg}
                    </p>
                  )}
                </ErrorMessage>
              </div>

              <button
                className="h-10 w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] disabled:cursor-not-allowed"
                type="submit"
              >
                {isPending ? <LoaderSmall /> : "Register"}
              </button>
            </Form>
          );
        }}
      </Formik>

      <p className="text-[var(--on-background)] w-full sm:w-72 mt-4 sm:mt-2 sm:px-4 px-12">
        Already have an account?
        <br />
        <span className="text-[var(--primary)] underline">
          <Link to="/login">Sign in</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
