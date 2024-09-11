/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import PublicApi from '../../api/PublicApi';
import { useAuthContext } from '../../contexts/AuthContext';
import { TOKEN, REFRESH_TOKEN, setToken } from '../../api/Api';
import loginSchema from '../../yup/login';

const styles = {
  container:
    'flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8',
  label: 'block text-sm font-medium leading-6 text-gray-900',
  formContainer: 'mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]',
  innerFormContainer: 'bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12',
  formFieldSection: 'space-y-6',
  fieldContainer:
    'rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600',
  field:
    'block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  formError: 'text-red-500 text-sm',
  checkBoxContainer: 'flex items-center mt-4',
  checkBoxInnerContainer: '',
  checkbox:
    'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
  buttonContainer: 'mt-6 flex items-center justify-end gap-x-6',
  button:
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  errorMsg: 'text-red-500 text-sm',
  link: 'text-blue-600 dark:text-blue-500 hover:underline',
};

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const { dispatch } = useAuthContext();

  const submit = async (values) => {
    try {
      const response = await PublicApi.post('/login', { ...values });

      const { token, refresh_token, user } = response.data;

      if (token) {
        setToken(TOKEN, token);

        if (refresh_token) {
          setToken(REFRESH_TOKEN, refresh_token);
        }

        dispatch({ type: 'SET_USER', payload: user });
        navigate('/');
      }
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.innerFormContainer}>
          <div className={styles.formFieldSection}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                submit(values);
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.fieldContainer}>
                    <Field
                      className={styles.field}
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    className={styles.formError}
                    name="email"
                  />
                  <label htmlFor="passowrd" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.fieldContainer}>
                    <Field
                      className={styles.field}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  <ErrorMessage
                    component="div"
                    className={styles.formError}
                    name="password"
                  />
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.button}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
            {errors
              ? errors.map((error) => (
                  <div className="text-red-500 text-sm">{error}</div>
                ))
              : null}
            <div className="text-sm leading-6">
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Don&apos;t have an account yet?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
