import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {MdAlternateEmail} from 'react-icons/md';

const Email = ({email, setEmail, setFormSection, setSecurityQuestion}) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/users/get-security-question`, {email})
    .then((res) => {
      setSecurityQuestion(res.data);
      setFormSection('answer');
    })
    .catch((err) => {
      setError(err.response.data.error);
      setTimeout(() => {
        setError('');
      }, 3000);
    });
  };

  return (
    <form className='recovery-form' onSubmit={handleSubmit}>
      <div className='recovery-form__section'>
        <h2>Account Recovery</h2>
      </div>
      <div className='recovery-form__section'>
        <div className='regular-input'>
          <MdAlternateEmail />
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
            placeholder='Email'
          />
        </div>
      </div>
      <div className='recovery-form__section main-btns'>
        <button type='button' onClick={() => navigate(-1)}>Cancel</button>
        <button type='submit'>Submit</button>
      </div>
      <div className='recovery-form__section error'>
        {error && <p>{error}</p>}
      </div>
    </form>
  )
}

export default Email
