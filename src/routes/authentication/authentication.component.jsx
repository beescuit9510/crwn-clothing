import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './authentication.styles.scss';

// useEffect(async () => {
//   const response = await getRedirectResult(auth);
//   if (response) {
//     const userDocRef = await createUserDocumentFromAuth(response.user);
//   }
// }, []);
// const logGoogleRedirectUser = async () => {
//   const { user } = await signInWithGoogleRedirect();
//   console.log(user);
// };
//   {
//     /* <button onClick={signInWithGoogleRedirect}>
//   Sign in with Google Redirect
// </button> */
//   }

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
