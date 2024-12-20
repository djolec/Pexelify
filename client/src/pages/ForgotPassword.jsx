import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PexelifyBanner from "../ui/PexelifyBanner";
import ThemeBtn from "../ui/ThemeBtn";
import emailRegex from "../constants/emailRegex";
import useSendPwdResetLink from "../features/authentication/useSendPwdResetLink";
import LoaderSmall from "../ui/LoaderSmall";
import useGetCooldown from "../features/authentication/useGetCooldown";
import { apiPwdResetCooldown } from "../services/apiAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(emailRegex, "Please enter a valid email")
    .required("Please enter your email")
    .min(4, "The username must be at least 4 characters long"),
});

const ForgotPassword = () => {
  const [cooldown, setCooldown] = useState(0);
  const [username, setUsername] = useState("nokey");

  const { sendPasswordLink, isSendingPasswordLink } = useSendPwdResetLink();
  const { data, refetch } = useGetCooldown(username, apiPwdResetCooldown);

  const handleSubmit = (values) => {
    const { username } = values;
    setUsername(username);
    sendPasswordLink(username, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  useEffect(() => {
    if (data && data.data?.resetTime) {
      const reset = new Date(data.data.resetTime).getTime() / 1000;
      const currentTime = new Date().getTime() / 1000;
      const diff = Math.ceil(reset - currentTime);

      setCooldown(diff);

      const interval = setInterval(() => {
        setCooldown((prevCooldown) => Math.max(prevCooldown - 1, 0));
      }, 1000);

      if (diff <= 0) clearInterval(interval);
      return () => clearInterval(interval);
    }
  }, [data]);

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

          <button
            className="h-10 w-full rounded-full bg-[var(--primary)] px-4 py-2 text-base text-[var(--on-primary)] disabled:cursor-not-allowed 2xl:h-12 2xl:text-2xl"
            type="submit"
            disabled={isSendingPasswordLink || cooldown > 0}
          >
            {isSendingPasswordLink ? (
              <LoaderSmall />
            ) : cooldown > 0 ? (
              `Wait ${Math.ceil(cooldown / 60)}m to resend`
            ) : (
              "Submit"
            )}
          </button>

          <div className="flex w-full justify-between px-4">
            <span className="text-base text-[var(--primary)] underline 2xl:text-xl">
              <Link to="/login">Sign in</Link>
            </span>

            <span className="text-base text-[var(--primary)] underline 2xl:text-xl">
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
