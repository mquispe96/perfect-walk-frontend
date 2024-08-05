import {useState} from 'react';
import Email from './Components/Email';
import Answer from './Components/Answer';
import Password from './Components/Password';
import './Styling/recovery.css';

const ForgotPassword = () => {
  const [formSection, setFormSection] = useState('email');
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');

 
  return (
    <main className="form-container">
    {formSection === 'email' && (
      <Email
        email={email}
        setEmail={setEmail}
        setFormSection={setFormSection}
        setSecurityQuestion={setSecurityQuestion}
      />
    )}
    {formSection === 'answer' && (
      <Answer
        question={securityQuestion}
        email={email}
        setFormSection={setFormSection}
      />
    )}
    {formSection === 'password' && (
      <Password email={email} />
    )}
    </main>
  )
}

export default ForgotPassword
