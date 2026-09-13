
import { useNavigate, useParams } from "react-router-dom";

function CareerCategoryDetails() {
  const navigate = useNavigate();
  const { category } = useParams();

  const careerData = {
    technology: {
      title: "Technology",
      description:
        "Explore careers across software, artificial intelligence, data, security, cloud, networking and emerging technology.",

      branches: [
        {
          title: "Software",
          careers: [
            "Software Developer",
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Web Developer",
            "Mobile App Developer",
            "Android Developer",
            "iOS Developer",
            "Game Developer",
            "Embedded Systems Developer",
          ],
        },
        {
          title: "AI & Machine Learning",
          careers: [
            "AI Engineer",
            "Machine Learning Engineer",
            "Deep Learning Engineer",
            "NLP Engineer",
            "Computer Vision Engineer",
            "Generative AI Engineer",
            "Robotics Engineer",
            "AI Researcher",
            "Prompt Engineer",
          ],
        },
        {
          title: "Data",
          careers: [
            "Data Analyst",
            "Data Scientist",
            "Data Engineer",
            "Data Architect",
            "BI Analyst",
            "BI Developer",
            "Research Analyst",
            "Database Administrator",
          ],
        },
        {
          title: "Cybersecurity",
          careers: [
            "Cybersecurity Analyst",
            "Security Engineer",
            "Ethical Hacker",
            "Penetration Tester",
            "SOC Analyst",
            "Security Architect",
            "Digital Forensics Analyst",
            "Security Consultant",
          ],
        },
        {
          title: "Cloud & DevOps",
          careers: [
            "Cloud Engineer",
            "Cloud Architect",
            "DevOps Engineer",
            "Site Reliability Engineer",
            "Platform Engineer",
            "Infrastructure Engineer",
            "Cloud Security Engineer",
          ],
        },
        {
          title: "Networking",
          careers: [
            "Network Engineer",
            "Network Administrator",
            "Network Architect",
            "Systems Administrator",
            "Network Security Engineer",
            "Wireless Network Engineer",
          ],
        },
        {
          title: "Quality & Architecture",
          careers: [
            "QA Engineer",
            "Test Engineer",
            "Automation Test Engineer",
            "Performance Test Engineer",
            "Solutions Architect",
            "Technical Consultant",
            "Technical Product Manager",
          ],
        },
        {
          title: "Emerging Tech",
          careers: [
            "Blockchain Developer",
            "IoT Engineer",
            "AR/VR Developer",
            "Quantum Computing Researcher",
            "Automation Engineer",
            "Technical Writer",
            "Technology Consultant",
          ],
        },
      ],
    },

    data: {
      title: "Data & Analytics",
      description:
        "Explore careers that use data, statistics, research and analytical thinking to solve real-world problems.",

      branches: [
        {
          title: "Data Analysis",
          careers: [
            "Data Analyst",
            "Business Analyst",
            "Business Intelligence Analyst",
            "Marketing Analyst",
            "Financial Analyst",
            "Operations Analyst",
            "Product Analyst",
            "Reporting Analyst",
          ],
        },
        {
          title: "Data Science",
          careers: [
            "Data Scientist",
            "Applied Data Scientist",
            "Decision Scientist",
            "Quantitative Analyst",
            "Machine Learning Engineer",
            "Research Scientist",
            "Computational Scientist",
          ],
        },
        {
          title: "Data Engineering",
          careers: [
            "Data Engineer",
            "Analytics Engineer",
            "Data Architect",
            "Big Data Engineer",
            "ETL Developer",
            "Database Engineer",
            "Data Platform Engineer",
          ],
        },
        {
          title: "Business Intelligence",
          careers: [
            "BI Developer",
            "BI Consultant",
            "BI Architect",
            "Dashboard Developer",
            "Business Intelligence Manager",
            "Reporting Specialist",
          ],
        },
        {
          title: "Research & Statistics",
          careers: [
            "Research Analyst",
            "Statistical Analyst",
            "Market Research Analyst",
            "Econometrician",
            "Research Scientist",
            "Survey Researcher",
            "Policy Analyst",
          ],
        },
        {
          title: "Specialized Analytics",
          careers: [
            "Sports Analyst",
            "Healthcare Data Analyst",
            "Risk Analyst",
            "Fraud Analyst",
            "Customer Insights Analyst",
            "People Analytics Specialist",
            "Supply Chain Analyst",
          ],
        },
      ],
    },

    design: {
      title: "Design",
      description:
        "Explore careers focused on creativity, user experience, visual communication, products and digital experiences.",

      branches: [
        {
          title: "UI & UX",
          careers: [
            "UI Designer",
            "UX Designer",
            "UI/UX Designer",
            "UX Researcher",
            "Interaction Designer",
            "Information Architect",
            "UX Writer",
          ],
        },
        {
          title: "Product Design",
          careers: [
            "Product Designer",
            "Digital Product Designer",
            "Design Strategist",
            "Service Designer",
            "Design Consultant",
            "Design Lead",
            "Design Manager",
          ],
        },
        {
          title: "Visual Design",
          careers: [
            "Graphic Designer",
            "Visual Designer",
            "Brand Designer",
            "Communication Designer",
            "Illustrator",
            "Art Director",
            "Creative Director",
          ],
        },
        {
          title: "Motion & 3D",
          careers: [
            "Motion Designer",
            "3D Designer",
            "3D Artist",
            "Animation Designer",
            "VFX Artist",
            "Character Designer",
            "Motion Graphics Artist",
          ],
        },
        {
          title: "Fashion & Lifestyle",
          careers: [
            "Fashion Designer",
            "Textile Designer",
            "Jewellery Designer",
            "Interior Designer",
            "Furniture Designer",
            "Lifestyle Product Designer",
          ],
        },
        {
          title: "Media & Creative",
          careers: [
            "Video Designer",
            "Storyboard Artist",
            "Production Designer",
            "Photographer",
            "Creative Producer",
            "Content Designer",
            "Multimedia Designer",
          ],
        },
      ],
    },

    business: {
      title: "Business",
      description:
        "Explore careers across management, strategy, finance, operations, consulting, people and entrepreneurship.",

      branches: [
        {
          title: "Management",
          careers: [
            "Business Manager",
            "Operations Manager",
            "General Manager",
            "Project Manager",
            "Program Manager",
            "Product Manager",
            "Management Trainee",
          ],
        },
        {
          title: "Strategy & Consulting",
          careers: [
            "Management Consultant",
            "Strategy Consultant",
            "Business Consultant",
            "Strategy Analyst",
            "Business Analyst",
            "Corporate Strategy Analyst",
            "Operations Consultant",
          ],
        },
        {
          title: "Finance",
          careers: [
            "Financial Analyst",
            "Investment Analyst",
            "Investment Banker",
            "Risk Analyst",
            "Credit Analyst",
            "Financial Consultant",
            "Portfolio Manager",
            "Wealth Manager",
          ],
        },
        {
          title: "Human Resources",
          careers: [
            "HR Manager",
            "HR Business Partner",
            "Talent Acquisition Specialist",
            "Recruiter",
            "Learning & Development Specialist",
            "Compensation Analyst",
            "People Operations Specialist",
          ],
        },
        {
          title: "Operations",
          careers: [
            "Operations Analyst",
            "Supply Chain Manager",
            "Supply Chain Analyst",
            "Procurement Manager",
            "Logistics Manager",
            "Quality Manager",
            "Business Operations Specialist",
          ],
        },
        {
          title: "Entrepreneurship",
          careers: [
            "Entrepreneur",
            "Startup Founder",
            "Business Owner",
            "Social Entrepreneur",
            "Startup Consultant",
            "Franchise Owner",
            "Business Development Manager",
          ],
        },
      ],
    },

    marketing: {
      title: "Marketing",
      description:
        "Explore careers in branding, digital marketing, content, social media, advertising, research and business growth.",

      branches: [
        {
          title: "Digital Marketing",
          careers: [
            "Digital Marketing Specialist",
            "Digital Marketing Manager",
            "SEO Specialist",
            "SEM Specialist",
            "Performance Marketer",
            "Email Marketing Specialist",
            "Affiliate Marketing Manager",
          ],
        },
        {
          title: "Brand & Strategy",
          careers: [
            "Brand Manager",
            "Brand Strategist",
            "Marketing Strategist",
            "Marketing Consultant",
            "Campaign Manager",
            "Marketing Manager",
            "Consumer Insights Manager",
          ],
        },
        {
          title: "Content",
          careers: [
            "Content Strategist",
            "Content Writer",
            "Copywriter",
            "Content Creator",
            "Technical Content Writer",
            "Content Marketing Manager",
            "Creative Strategist",
          ],
        },
        {
          title: "Social Media",
          careers: [
            "Social Media Manager",
            "Social Media Strategist",
            "Community Manager",
            "Influencer Marketing Manager",
            "Social Media Analyst",
            "Creator Partnerships Manager",
          ],
        },
        {
          title: "Growth",
          careers: [
            "Growth Marketer",
            "Growth Manager",
            "Product Marketing Manager",
            "Growth Analyst",
            "Conversion Rate Specialist",
            "Customer Acquisition Manager",
          ],
        },
        {
          title: "Advertising & Research",
          careers: [
            "Advertising Specialist",
            "Media Planner",
            "Media Buyer",
            "Market Research Analyst",
            "Consumer Researcher",
            "Advertising Account Manager",
            "Creative Director",
          ],
        },
      ],
    },

    science: {
      title: "Science",
      description:
        "Explore careers across scientific research, biotechnology, healthcare, environment, chemistry, physics and discovery.",

      branches: [
        {
          title: "Life Sciences",
          careers: [
            "Biologist",
            "Microbiologist",
            "Biochemist",
            "Geneticist",
            "Molecular Biologist",
            "Cell Biologist",
            "Marine Biologist",
          ],
        },
        {
          title: "Biotechnology",
          careers: [
            "Biotechnologist",
            "Biomedical Scientist",
            "Bioinformatics Scientist",
            "Bioprocess Engineer",
            "Clinical Researcher",
            "Biotechnology Researcher",
            "Genomics Researcher",
          ],
        },
        {
          title: "Physics & Mathematics",
          careers: [
            "Physicist",
            "Astrophysicist",
            "Theoretical Physicist",
            "Applied Physicist",
            "Mathematician",
            "Statistician",
            "Actuary",
          ],
        },
        {
          title: "Chemistry",
          careers: [
            "Chemist",
            "Analytical Chemist",
            "Organic Chemist",
            "Materials Scientist",
            "Chemical Researcher",
            "Pharmaceutical Scientist",
          ],
        },
        {
          title: "Environment",
          careers: [
            "Environmental Scientist",
            "Environmental Consultant",
            "Ecologist",
            "Climate Scientist",
            "Geologist",
            "Hydrologist",
            "Conservation Scientist",
          ],
        },
        {
          title: "Research & Healthcare",
          careers: [
            "Research Scientist",
            "Laboratory Scientist",
            "Healthcare Researcher",
            "Medical Researcher",
            "Clinical Research Associate",
            "Epidemiologist",
            "Public Health Researcher",
          ],
        },
      ],
    },
  };

  const data = careerData[category];

  if (!data) {
    return (
      <div className="category-details-page">
        <div className="category-details-container">
          <h1>Career Category Not Found</h1>

          <button onClick={() => navigate("/")}>
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-details-page">
      <div className="category-details-container">

        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← BACK
        </button>

        <div className="category-header">
          <span>EXPLORE POSSIBILITIES</span>

          <h1>{data.title}</h1>

          <p>{data.description}</p>
        </div>

        <div className="career-tree">

          <div className="tree-root">
            <span>CAREER FIELD</span>
            <h2>{data.title}</h2>
          </div>

          <div className="tree-trunk"></div>

          <div className="tree-branches">
            {data.branches.map((branch, index) => (
              <div
                className="tree-branch"
                key={branch.title}
              >
                <div className="branch-connector"></div>

                <div className="branch-card">

                  <div className="branch-heading">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{branch.title}</h3>
                  </div>

                  <div className="career-options">
                    {branch.careers.map((career) => (
                      <div
                        className="career-option"
                        key={career}
                      >
                        {career}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="category-cta">

          <p>TOO MANY POSSIBILITIES?</p>

          <h2>
            Not Sure Which Path
            <span> Fits You?</span>
          </h2>

          <p className="cta-description">
            There are countless career directions.
            Let NextStep AI understand your interests,
            strengths and preferences.
          </p>

          <button
            onClick={() => navigate("/assessment")}
          >
            START MY ASSESSMENT →
          </button>

        </div>

      </div>
    </div>
  );
}

export default CareerCategoryDetails;

