import React from 'react'
import { useState } from 'react'
import { useToken } from './Authorization'


export default function LogOut() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken();
  // eslint-disable-next-line no-unused-vars
  const [logoutResponse, setLogoutResponse] = useState();

  async function onSubmit() {


    const result = await logout();
    setLogoutResponse(result);
  }

  return (
    <div className="container px-4 py-4 text-center">
      <div className="row gx-5">
        <div className="col">
          <div className="card shadow">
            <div className="card body px-4 py-4">
              <form>
                <h1> Log Out </h1>
                <button type="button" className="btn btn-dark rounded-pill" onClick={onSubmit}>Log Out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
