import React from "react";
import "./facts.css"; // Import CSS file
import robinHood from "../../assets/images/robinhood.webp";
import logo2 from "../../assets/images/logo2.png";
import wannacry2 from "../../assets/images/wannacry2.jpg";
import Header from "./Header";

function FactsComponent() {
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
          <b>💻 NOTABLE CYBER-ATTACKS 💻</b>
        </h1>
      </div>
      <main>
        {/* Content 1 */}
        <div className="content">
          <span className="c2">
            <img src={wannacry2} alt="image here" />
          </span>
          <span className="c1">
            <div className="subtitle">WannaCry Ransomware Attack, 2017</div>
            <p>
              One of the most devastating ransomware attacks in history in terms
              of loss volume was caused by WannaCry, launched in May 2017. This
              ransomware attack hit around 230,000 computers globally. It spread
              through computers operating Microsoft Windows. User's files were
              held hostage, and a Bitcoin ransom was demanded for their return.
              The attackers demanded $300 worth of bitcoins and then later
              increased the ransom demand to $600 worth of bitcoins. If victims
              did not pay the ransom within three days, victims were told that
              their files would be permanently deleted.
              <br />
              <b>Why did it happen?</b>
              <br />
              Computer users became victims of the WannaCry attack because they
              had not updated their Microsoft Windows operating system. Had they
              updated their operating systems regularly, they would have
              benefited from the security patch that Microsoft released before
              the attack.
              <br />
              Be sure to keep your software and operating system updated. This
              is an essential ransomware protection step!!!
            </p>
          </span>
        </div>

        {/* Content 2 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">Robinhood Attack, 2021</div>
            <p>
              Robinhood is a USA-based stock trading app. On November 3rd 2021,
              data of 7 million users was stolen and held to ransom by cyber
              criminals.The hackers accessed this data through social
              engineering, divulging employee login details to access the
              network without using brute force. This led to 5 million users
              having their email addresses compromised, with a further 2 million
              having their full names exposed. 310 victims had more personal
              information stolen, including dates of birth and US zip codes.The
              hackers demanded a ransom to prevent this data from being leaked.
              Robinhood refused, hiring a cyber security firm to investigate the
              breach.
            </p>
          </span>
          <span className="c2">
            <img src={robinHood} alt="image here" />
          </span>
        </div>

        {/* Content 3 */}
        {/* Repeat the same structure for other content sections */}

        {/* Footer */}
      </main>
    </div>
  );
}

export default FactsComponent;
