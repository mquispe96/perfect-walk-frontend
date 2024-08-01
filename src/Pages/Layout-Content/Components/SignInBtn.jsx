import { useNavigate } from 'react-router-dom';
import {CgLogIn} from 'react-icons/cg';

const SignInBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="page-header__sign-in-btn">
      <button onClick={() => navigate('/login')}>
        <CgLogIn className='icon'/>
        Sign in
      </button>
    </div>
  );
};

export default SignInBtn;
