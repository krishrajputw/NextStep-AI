import { Link } from "react-router-dom";
function FinalCTA() {
return ( <section className="final-cta"> <div className="cta-content"> <p>YOUR NEXT STEP STARTS NOW</p>


    <h2>
      Ready To Find
      <span>Your Career Path?</span>
    </h2>

    <p className="cta-description">
      Answer a few simple questions and let NextStep AI help
      you discover careers that match your strengths and interests.
    </p>

    <Link to="/assessment" className="primary cta-button">
      START MY ASSESSMENT <b>→</b>
    </Link>
  </div>
</section>


);
}

export default FinalCTA;
