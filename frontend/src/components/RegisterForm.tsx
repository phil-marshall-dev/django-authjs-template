  
  'use client';

  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import { useFormInput } from "@/utils";
import { IRegisterCredentials } from '@/models';
import { signIn } from 'next-auth/react';

// const RegisterForm = () => {
//     return (
//       <form>
//         <div className="mb-3">
//           <label htmlFor="formBasicUsername" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="formBasicUsername"
//             name="username"
//             placeholder="Username"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="formBasicEmail" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="formBasicEmail"
//             name="email"
//             placeholder="Email address"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="formBasicPassword" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="formBasicPassword"
//             name="password"
//             placeholder="Password"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">
//           Register
//         </button>
//       </form>
//     );
//   };
  

const RegisterForm = () => {
  const { state: registerCredentials, handleInputChange } = useFormInput<IRegisterCredentials>({ username: '', password1: '',password2: '', email: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerCredentials),
      });

      if (response.ok) {
        await signIn('credentials', {
          username: registerCredentials.username,
          password: registerCredentials.password1,
          redirect: false,
        });
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="formBasicUsername" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="formBasicUsername"
          name="username"
          placeholder="Username"
          value={registerCredentials.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formBasicEmail" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="formBasicEmail"
          name="email"
          placeholder="Email address"
          value={registerCredentials.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formBasicPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="formBasicPassword1"
          name="password1"
          placeholder="Password"
          value={registerCredentials.password1}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formBasicPassword2" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="formBasicPassword2"
          name="password2"
          placeholder="Confirm Password"
          value={registerCredentials.password2}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  );
};

export default RegisterForm;
