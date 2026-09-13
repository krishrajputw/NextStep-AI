
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main id="home" className="hero">
      <div className="hero-content">
        <p className="eyebrow">AI-POWERED CAREER GUIDANCE</p>

        <h1>
          YOUR
          <br />
          FUTURE
          <span>STARTS HERE.</span>
        </h1>

        <p className="description">
          Confused about your career? NextStep AI analyzes your
          interests, skills and goals to help you discover the right path.
        </p>

        <div className="buttons">
          <Link to="/assessment" className="primary">
            DISCOVER MY PATH <b>→</b>
          </Link>

          <Link to="/assessment" className="secondary">
            EXPLORE CAREERS
          </Link>
        </div>
      </div>

      <div className="orb-wrapper">
        <Link to="/assessment" className="orb-link">
          <div className="glow"></div>

          <div className="orb">
            <div className="orb-line line1"></div>
            <div className="orb-line line2"></div>
            <div className="orb-line line3"></div>

            <div className="core">✦</div>

            <div className="orb-text">
              FIND
              <span>YOUR CAREER</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="side-label">
        INTELLIGENCE • GUIDANCE • FUTURE
      </div>
    </main>
  );
}

export default Hero;

