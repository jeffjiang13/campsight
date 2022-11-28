import { useState } from 'react';

function AccountForm(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="form-control" id="email" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
        <input value={name} required type="text" className="form-control" id="name" placeholder="Your Name" />
    </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">password</label>
        <input value={password} required type="password" className="form-control" id="name" placeholder="password" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default AccountForm;
