import { useNavigate } from "react-router-dom";

function CareerCategories() {
  const navigate = useNavigate();

  const careers = [
    {
      number: "01",
      title: "Technology",
      description:
        "Software development, cybersecurity, cloud and emerging technologies.",
      slug: "technology",
    },
    {
      number: "02",
      title: "Data & Analytics",
      description:
        "Turn data into insights through analytics, AI and machine learning.",
      slug: "data",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Explore UI/UX, product design, visual design and creative careers.",
      slug: "design",
    },
    {
      number: "04",
      title: "Business",
      description:
        "Discover opportunities in management, finance, consulting and strategy.",
      slug: "business",
    },
    {
      number: "05",
      title: "Marketing",
      description:
        "Build a career in digital marketing, branding, content and growth.",
      slug: "marketing",
    },
    {
      number: "06",
      title: "Science",
      description:
        "Explore research, biotechnology, healthcare and scientific careers.",
      slug: "science",
    },
  ];

  return (
    <section id="careers" className="careers">
      <div className="section-header">
        <p>EXPLORE POSSIBILITIES</p>
        <h2>Find A Career That Fits You</h2>
      </div>

      <div className="career-grid">
        {careers.map((career) => (
          <div
            className="career-card"
            key={career.number}
            onClick={() =>
              navigate(`/careers/${career.slug}`)
            }
          >
            <span>{career.number}</span>

            <h3>{career.title}</h3>

            <p>{career.description}</p>

            <b>→</b>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CareerCategories;