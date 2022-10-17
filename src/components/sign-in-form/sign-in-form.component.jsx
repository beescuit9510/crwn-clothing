import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      console.log(user);

      resetFormFields();
    } catch (error) {
      const getErrorMessage = (errorCode) => {
        const errorMessages = {
          'auth/wrong-password': 'incorrect password for email',
          'auth/user-not-found': 'not found user',
        };
        return errorMessages[errorCode];
      };

      const errorMessage = getErrorMessage(error.code);

      if (errorMessage) return alert(errorMessage);

      console.log('user creation encountered an error :', error);
    }
  };

  const signInWithGoogle = async () => await signInWithGooglePopup();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          minLength={6}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
