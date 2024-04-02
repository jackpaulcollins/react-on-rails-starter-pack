import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  last_name: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  time_zone: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().password().required('Required'),
  password_confirmation: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Password and Password Confirmation do not match',
    )
    .required('Required'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'Please accept the terms and conditions')
    .required('Required'),
});

export default registrationSchema;
