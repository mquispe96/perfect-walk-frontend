import {useComponentVisible} from '../../Custom-Hooks/useComponentVisible.js';
import SignInWindow from './SignInWindow';
import {CgLogIn} from 'react-icons/cg';

const SignInBtn = () => {
  const {ref, isComponentVisible, setIsComponentVisible} =
    useComponentVisible(false);

  return (
    <div ref={ref} className="page-header__sign-in-btn">
      <button onClick={() => setIsComponentVisible(prev => !prev)}>
        <CgLogIn className='icon'/>
        Sign in
      </button>
      {isComponentVisible && (
        <SignInWindow setIsComponentVisible={setIsComponentVisible} />
      )}
    </div>
  );
};

export default SignInBtn;
