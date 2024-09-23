import { Link } from "react-router-dom";
import "../styles/Landingpage.css";





import ButtonComponent from "../component/ButtonComponent";

export default function LandingPage() {
 
  const plansData = [
    {
      name: "Basic",
      price: "$19/month",
      features: ["1000 Transactions  ✓",
       "Email Support  ✓",
        "Basic Reporting  ✓",
        "24/7 support X",'Dedicated Account Manager X',
      ],
        
      buttonLabel: "choose a plan",
    },
    {
      name: "Pro",
      price: "$49/month",
      features: [
        "Unlimited Transactions ✓ ",
        "Priority Email Support ✓",
        "Advanced Reporting ✓",
        "Item Recommendations ✓",
        "Dedicated Account Manager X",
      ],
      buttonLabel: "choose a plan",
    },
    {
      name: "Enterprise",
      price: "100rs/month",
      features: [
        "Custom Transactions ✓",
        "24/7 Support ✓",
        "Custom Reporting ✓",
        "Item Recommendations ✓",
        "Dedicated Account Manager ✓",
      ],
      buttonLabel: "choose a plan",
    },
  ];

  return (
    <>
      <nav className="nav-container">
        <ul className="nav-items">
          <li>
            {" "}
            <a href="#main">Home</a>
          </li>
          <li>
            {" "}
            <a href="#pricing">Pricing </a>
          </li>
          <li>
            {" "}
            <a href="#howto">How To use</a>
          </li>
          <li>
            {" "}
            <a href="#about">About </a>{" "}
          </li>
        </ul>
      </nav>
      <section id="main" className="container-landing-page-mainpage">
        <div>
          <div>
            <div>
              <h1>Welcome to Market Basket Analysis Platform</h1>
              <h3> A Data mining platform</h3>
              <p>
                Uncover hidden trends and patterns in your sales data. Our
                platform uses advanced market basket analysis to help you
                understand customer buying behavior and optimize your marketing
                strategies.
              </p>
            </div>
            <div className="container-login-register">
              <Link to="/guest/login" href="#">
                Login
              </Link>
              <Link to="/guest/register" href="#">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="container-pricing-plans">
        <div>
          <div>
            <div>
              <h2>Energy Buying</h2>
              <p>
                Buy energy for analysis. Each energy costs 20 Rs. You get 1 free
                energy to start with, after which you need to buy more. 1 energy
                is used for each analysis.
              </p>
            </div>
          </div>
          <div className="plans-container">
            <div className="plans-card">
              <h2>Free Energy</h2>
              <p>Get one free energy on registration</p>
              <ul>
                <li>1 Free Energy</li>
                <li>1 Energy per Analysis</li>
              </ul>
            </div>
            <div className="plans-card">
              <h2>Energy</h2>
              <p>20 Rs per each energy</p>
              <ul>
                <li>1 Energy per Analysis</li>
                <li>Payment Accepted : Esewa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="howto" className="container-how-to-use">
        <div>
          <div>
            <div>
              <h2>How to Use Our Platform</h2>
              <p>
                Get started with our platform in just a few simple steps. Follow
                our guide to learn how to analyze your sales data and uncover
                valuable insights.
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2>Step 1: Register</h2>
                <p>
                  Create an account to access our platform. Choose a pricing
                  plan that suits your needs.
                </p>
              </div>
            </div>
            <div>
              <div>
                <h2>Step 2: Upload Data</h2>
                <p>
                  Upload your sales data in CSV format. Our platform supports
                  large datasets.
                </p>
              </div>
            </div>
            <div>
              <div>
                <h2>Step 3: Analyze</h2>
                <p>
                  Use our platform to analyze your data. Uncover hidden trends
                  and patterns.
                </p>
              </div>
            </div>
            <div>
              <div>
                <h2>Step 4: Result visualization</h2>
                <p>
                 Visualize the results using different charts
                </p>
              </div>
            </div>
            <div>
              <div>
                <h2>Step 4(optional): Connect your ecommerce site directly</h2>
                <p>
                  Expose a endpoint in your ecommerce site to connect to this
                  platform and perform analysis on your sells data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="container-join-team">
        <div>
          <div>
            <div>
              <h2>Ready to Get Started?</h2>
              <p>
                Join our platform today and start uncovering hidden insights in
                your sales data.
              </p>
            </div>
            <div>
              <Link to="/guest/register" href="#">
                Register
              </Link>
              <Link to="/guest/login" href="#">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>© 2024 Market Basket Analysis. All rights reserved.</p>
        <nav>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy</Link>
        </nav>
      </footer>
    </>
  );
}
