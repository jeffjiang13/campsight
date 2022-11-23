import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "./Context"

let internalToken = null

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function getUserInfo() {
  const parsedToken = parseJwt(getToken())
  return {
    "username": parsedToken.user.username,
    "id": parsedToken.user.id
  }
}
export function getToken() {
  return internalToken
}
export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_USERS}/users/api/tokens/mine/`
  try {

    const response = await fetch(url, {
      credentials: "include",
    })

    if (response.ok) {

      const data = await response.json()
      internalToken = await data.token
      return internalToken
    }
  } catch (e) { console.log("test ") }
  return false
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error
    try {
      error = JSON.parse(error)
      if ("__all__" in error) {
        error = error.__all__
      }
    } catch { }
  }
  if (Array.isArray(error)) {
    error = error.join("<br>")
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    )
  }
  return error
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
})





export const AuthProvider = (props) => {
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export function useToken() {

  const { token, setToken } = useAuthContext();
  const navigate = useNavigate();
  const { setUserId } = useContext(Context)

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal()
      setToken(token)
    }
    if (!token) {
      fetchToken()
    }
  }, [setToken, token])

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_USERS}/api/token/refresh/logout/`
      const response = await fetch(url, { method: "delete", credentials: "include" })
      if (response.ok) {
        internalToken = null
        setToken(null)
        navigate("/")
        window.location.reload()
        return (response)
      }
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_USERS}/login/`
    const form = new FormData()
    form.append("username", username)
    form.append("password", password)
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    })
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      let tokeninfo = await parseJwt(token)
      setUserId(tokeninfo.user)
      navigate("/intro/");
    }
    let error = await response.json()
    return handleErrorMessage(error)
  }

  async function signup(username, password, email, first_name, last_name, city, state) {
    const url = `${process.env.REACT_APP_USERS}/users/`
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name,
        last_name,
        city,
        state,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      await login(username, password)
      navigate("/intro/")
    }
    return false
  }

  async function update(username, password, email, firstName, lastName) {
    const url = `${process.env.REACT_APP_USERS}/api/accounts/`
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      await login(username, password)

    }
    return false
  }

  return [token, login, logout, signup, update]
}
