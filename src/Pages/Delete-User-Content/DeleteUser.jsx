import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { PageContext } from '../Context/PageContext';
import {MdAlternateEmail} from 'react-icons/md';
import {TbPasswordUser} from 'react-icons/tb';
import {LuEye, LuEyeOff} from 'react-icons/lu';
import './Styling/delete.css';

const DeleteUser = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, setUser } = useContext(PageContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkForm = (e) => {
    e.preventDefault();
    if(!credentials.email || !credentials.password) {
      setError('All fields are required');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    } else {
      setConfirmDelete(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/users/delete-account/${user.id}`, {data: credentials})
      .then(() => {
        setUser(false);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response.data.error);
        setConfirmDelete(false);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  };

  return (
    <main className='form-container'>
      <form className='delete-form' onSubmit={handleSubmit}>
        <div className='delete-form__section'>
          <h2>Delete Account</h2>
        </div>
        <div className='delete-form__section'>
          <div className='regular-input'>
            <MdAlternateEmail />
            <input
              type='email'
              name='email'
              id='email'
              value={credentials.email}
              onChange={handleChange}
              required
              autoComplete='off'
              placeholder='Email'
            />
          </div>
        </div>
        <div className='delete-form__section'>
          <div className='regular-input'>
            <TbPasswordUser />
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete='off'
              placeholder='Password'
            />
            {showPassword ? (
              <LuEyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <LuEye onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>
        {!confirmDelete ? (
          <div className='delete-form__section main-btns'>
            <button type='button' onClick={() => navigate(-1)}>Cancel</button>
            <button type='button' onClick={(e) => checkForm(e)}>Delete Account</button>
          </div>
        ) : (
          <div className='delete-form__section main-btns'>
            <button type='button' onClick={() => navigate(-1)}>Cancel</button>
            <button type='submit'>Confirm</button>
          </div>
        )}
        <div className='delete-form__section error'>
          {error && <p>{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default DeleteUser
