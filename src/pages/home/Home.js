import React from "react";
import "./index.css"; // Import CSS file
import cybersecurity from "../../assets/images/cybersecurity.png";
import Header from "./Header";

function HomeComponent() {
  return (
    <div className="bodys">
      <div className="heading">
        <Header />
        <h1
          style={{
            marginTop: "10px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          <b>📚 Education Management 📚</b>
        </h1>
      </div>
      <main style={{ marginBottom: "240px" }}>
        <div className="content">
          <span className="c1">
            <div className="toppart">
              <div className="title">
                STUDENT MANAGEMENT
                <br />
                SYSTEM
              </div>
            </div>
            <p className="subtitle">
              Managing students efficiently is crucial for effective education
              management. Our student management system provides a comprehensive
              solution to streamline student-related tasks and enhance academic
              operations.
              <br />
              From admissions to assessments, from attendance tracking to
              performance analysis, our system covers it all, ensuring seamless
              management of student data and improving educational outcomes.
            </p>
          </span>

          <span className="c2">
            <img id="gallery" src={cybersecurity} alt="image here" />
          </span>
        </div>
      </main>

      <footer style={{ marginBottom: 0 }}>
        <a href="about.html">
          <img
            style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.5))" }}
            className="card3"
          />
        </a>
        <a href="contact.html">
          <img
            style={{ filter: "drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.5))" }}
            className="card2"
          />
        </a>
      </footer>
    </div>
  );
}

export default HomeComponent;
