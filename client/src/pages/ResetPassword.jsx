import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import PexelifyBanner from "../ui/PexelifyBanner";
import ThemeBtn from "../ui/ThemeBtn";
import useResetPassword from "../features/authentication/useResetPassword";
import LoaderSmall from "../ui/LoaderSmall";
import { useLocation } from "react-router-dom";

const initialValues = {
  password: "",
  passwordConfirmation: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 characters long"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const { resetPassword, isResetingPassword } = useResetPassword();

  const handleSubmit = (values) => {
    resetPassword({ password: values.password, resetToken: token });
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
            <Field name="password">
              {({ field, form }) => (
                <input
                  className="w-full sm:w-72 2xl:w-[400px] rounded-full bg-[var(--surface-container-high)] 2xl:text-2xl text-base px-4 2xl:px-6 py-2 text-[var(--on-background)] outline-none"
                  {...field}
                  type="password"
                  id="password"
                  placeholder="New password"
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

          <div className="relative w-full sm:w-fit">
            <Field name="passwordConfirmation">
              {({ field, form }) => (
                <input
                  className="w-full sm:w-72 2xl:w-[400px] rounded-full bg-[var(--surface-container-high)] 2xl:text-2xl text-base px-4 2xl:px-6 py-2 text-[var(--on-background)] outline-none"
                  {...field}
                  type="password"
                  id="passwordConfirmation"
                  placeholder="Confirm new password"
                  autoComplete="off"
                  onKeyDown={() => form.setFieldTouched("passwordConfirmation")}
                />
              )}
            </Field>

            <ErrorMessage name="passwordConfirmation">
              {(msg) => (
                <p className="sm:absolute left-[105%] top-1/2 w-60 sm:-translate-y-1/2 text-sm text-red-600 pl-4 sm:pl-0 2xl:text-xl">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <button
            className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] h-10 2xl:h-12 2xl:text-2xl text-base disabled:cursor-not-allowed relative"
            type="submit"
            disabled={isResetingPassword}
          >
            {isResetingPassword ? <LoaderSmall /> : "Submit"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
