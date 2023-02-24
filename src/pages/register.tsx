import Link from "next/link";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <div className="login-container">
        <div className="login">
          <Link href="/login">
            <div className="back-arrow"></div>
          </Link>

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
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />

            <button
              type="submit"
              className="login-btn"
              style={{
                marginTop: 16,
              }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
