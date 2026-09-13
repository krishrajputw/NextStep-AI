
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }


      navigate("/login", {
  state: {
    message: "Registration successful, please login",
  },
});
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          NEXTSTEP<span>AI</span>
        </div>

        <p className="auth-label">CREATE YOUR ACCOUNT</p>

        <h1>Start Your Journey</h1>

        <p className="auth-description">
          Create an account and discover the career path that's right for you.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            CREATE ACCOUNT <b>→</b>
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

