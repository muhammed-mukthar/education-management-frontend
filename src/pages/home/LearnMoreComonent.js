import React from "react";
import "./Learn_more.css"; // Import CSS file
import logo2 from "../../assets/images/logo2.png";
import cyberAttackImage from "../../assets/images/cyber-attack.png";
import cyberSecurityImage from "../../assets/images/cyber-security.png";
import Header from "./Header";

function LearnMoreComponent() {
  return (
    <div className="bodys">
      <Header />
      <main>
        {/* Topic 1 */}
        <div className="content">
          <span className="c2">
            <img src={cyberAttackImage} alt="image here" />
          </span>
          <span className="c1">
            <div className="subtitle">What is a Cyber Attack?</div>
            <p>
              A cyber attack is an assault launched by cybercriminals using one
              or more computers against single or multiple computers or even
              networks. It can maliciously disable computers, steal data, or use
              a breached computer as a launch point for other attacks. They are
              a threat to your sensitive data, as attackers use new methods
              powered by social engineering and artificial intelligence (AI) to
              bypass traditional data security controls.
            </p>
          </span>
        </div>

        {/* Topic 2 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">What is Cybersecurity?</div>
            <p>
              <b>Cybersecurity</b> is the process of protecting and recovering
              computer systems, networks, devices, and programs from any type of
              cyber attack.
              <h3>Importance of Cybersecurity:</h3>
              <ul>
                <li>
                  Cybercrime is so prevalent that anyone who browses the
                  internet is a potential victim.
                </li>
                <li>
                  Data Leaks that could result in identity theft are now
                  publicly posted on social media accounts.
                </li>
                <li>
                  Sensitive information like social security numbers, credit
                  card information and bank account details are now stored in
                  cloud storage services like Dropbox or Google Drive.
                </li>
                <li>
                  Organizations of all sizes from every industry on earth have
                  been hit by cyberattacks, be it social media giant Facebook or
                  ride-sharing giant Uber.
                </li>
              </ul>
            </p>
          </span>
          <span className="c2">
            <img src={cyberSecurityImage} alt="image here" />
          </span>
        </div>
      </main>
    </div>
  );
}

export default LearnMoreComponent;
