import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Register() {
  return (
    <>
      <Navbar />
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
