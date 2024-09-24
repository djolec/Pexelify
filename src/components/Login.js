import ThemeBtn from "./ThemeBtn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Username must be a valid email")
    .required("Please enter your email")
    .min(4, "The username must be at least 4 characters long"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 characters long"),
});

const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center gap-8 bg-[var(--surface)] pt-[20vh]">
      <div className="absolute right-10 top-10">
        <ThemeBtn />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex w-fit flex-row gap-2">
          <h1 className="text-6xl font-semibold text-[var(--primary)] 2xl:text-6xl">
            Pexelify
          </h1>

          <img
            height="250"
            width="250"
            className="h-16 w-auto 2xl:h-[100px]"
            src="/assets/images/logos/PexelifyLogo.webp"
            alt=""
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
        <Form className="flex w-72 flex-col items-center gap-4">
          <div className="relative w-fit">
            <Field
              className="w-72 rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-[var(--on-background)] outline-none"
              type="email"
              id="username"
              name="username"
              placeholder="Email"
              autoComplete="off"
            />
            <ErrorMessage name="username">
              {(msg) => (
                <p className="absolute left-[105%] top-1/2 w-60 -translate-y-1/2 text-sm text-red-600">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <div className="relative">
            <Field
              className="w-72 rounded-full bg-[var(--surface-container-high)] px-4 py-2 text-[var(--on-background)] outline-none"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
            />
            <ErrorMessage name="password">
              {(msg) => (
                <p className="absolute left-[105%] top-1/2 w-60 -translate-y-1/2 text-sm text-red-600">
                  {msg}
                </p>
              )}
            </ErrorMessage>
          </div>

          <button
            className="w-full rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)]"
            type="submit"
          >
            Sign in
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
