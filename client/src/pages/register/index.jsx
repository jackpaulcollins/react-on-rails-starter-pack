import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import { timeZones } from '../../system/system';
import PublicApi from '../../api/PublicApi';
import registrationSchema from '../../yup/register';

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
  checkBoxContainer: 'mt-4',
  checkBoxInnerContainer: 'flex items-center',
  checkbox:
    'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
  buttonContainer: 'mt-6 flex items-center justify-end gap-x-6',
  button:
    'flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  errorMsg: 'text-red-500 text-sm',
  link: 'text-blue-600 dark:text-blue-500 hover:underline',
};

const renderTimeZones = () => timeZones.map((t) => <option value={t}>{t}</option>);

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const submit = async (values) => {
    try {
      const response = await PublicApi.post('/users', { ...values });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('wdp-jwt-token', token);
        navigate('/');
      }
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password_confirmation: '',
        first_name: '',
        last_name: '',
        time_zone: '',
        termsAccepted: false,
      }}
      validationSchema={registrationSchema}
      onSubmit={(values, { setSubmitting }) => {
        submit(values);
        setSubmitting(false);
      }}
    >
      {({
        values, handleChange, handleBlur, handleSubmit, isSubmitting,
      }) => (
        <div className={styles.container}>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.innerFormContainer}>
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
              <label htmlFor="password_confirmation" className={styles.label}>
                Password Confirmation
              </label>
              <div className={styles.fieldContainer}>
                <Field
                  className={styles.field}
                  type="password"
                  name="password_confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                />
              </div>
              <ErrorMessage
                component="div"
                className={styles.formError}
                name="password_confirmation"
              />
              <label htmlFor="first_name" className={styles.label}>
                First Name
              </label>
              <div className={styles.fieldContainer}>
                <Field
                  className={styles.field}
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                />
              </div>
              <ErrorMessage
                component="div"
                className={styles.formError}
                name="first_name"
              />
              <label htmlFor="last_name" className={styles.label}>
                Last Name
              </label>
              <div className={styles.fieldContainer}>
                <Field
                  className={styles.field}
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                />
              </div>
              <ErrorMessage
                component="div"
                className={styles.formError}
                name="last_name"
              />
              <label htmlFor="time_zone" className={styles.label}>
                Time Zone
              </label>
              <div className={styles.fieldContainer}>
                <Field className={styles.field} as="select" name="time_zone">
                  {renderTimeZones()}
                </Field>
              </div>
              <ErrorMessage
                component="div"
                className={styles.formError}
                name="time_zone"
              />
              <div className={styles.checkBoxContainer}>
                <div className={styles.checkBoxInnerContainer}>
                  <label
                    htmlFor="termsAccepted"
                    className={`${styles.label} inline-flex mr-2`}
                  >
                    I agree with the
                    {' '}
                    <p className={`${styles.link} ml-1`}>terms & conditions</p>
                  </label>
                  <Field
                    className={styles.checkbox}
                    type="checkbox"
                    name="termsAccepted"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.termsAccepted}
                  />
                </div>
              </div>
              <ErrorMessage
                component="div"
                className={styles.formError}
                name="termsAccepted"
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
              {errors ? errors.map((error) => (<div className="text-red-500 text-sm">{error}</div>)) : null}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm leading-6">
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default Register;
