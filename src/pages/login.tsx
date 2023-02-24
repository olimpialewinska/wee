/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */

import Head from "next/head";

export default function Login() {
  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="login-header-icon"></div>
          <form className="login-content">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />

            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="login-btn"
              style={{
                marginTop: 16,
              }}
            >
              Log in
            </button>
          </form>
          <div className="login-footer">
            <p>Don't have an acoount? </p> <a href="/register">Sign up!</a>
          </div>
        </div>
      </div>
    </>
  );
}
