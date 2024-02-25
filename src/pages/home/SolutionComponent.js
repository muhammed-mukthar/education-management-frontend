import React from "react";
import "./solutions.css"; // Import CSS file
import logo2 from "../../assets/images/logo2.png";
import warningIcon from "../../assets/images/warning.png";
import passIcon from "../../assets/images/passicon.png";
import globeIcon from "../../assets/images/globe.png";
import Header from "./Header";

function SolutionsComponent() {
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
          <b>❗ TIPS TO PROTECT YOURSELF ONLINE ❗</b>
        </h1>
      </div>
      <main>
        {/* Topic 1 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">
              1. Use Strong Passwords and a Password Manager
            </div>
            <p>
              • Using strong passwords increases your protection against brute
              force attacks.
              <br />
              <br />• These attacks happen when a cybercriminal, or “threat
              actor,” uses software that generates random and known passwords
              (acquired from data breaches) to try to guess what your password
              is.
              <br />
              <br />• Password managers come in handy for keeping strong
              passwords. With a Password Manager, you only need to remember one
              password. Once you enter the master password, the password manager
              will fetch and input the password in the form you’re filling out
              (assuming you’ve already stored the information in the password
              manager). Therefore, you can use extremely strong and lengthy
              passwords without worrying about remembering them, and without
              writing your passwords on a post-it note.
            </p>
          </span>
        </div>

        {/* Topic 2 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">
              2. Use Two-Factor Authentication (2FA)
            </div>
            <p>
              • The first layer of protection between your account and someone
              else accessing it is your password. The second layer is two-factor
              authentication (2FA). You should be using it to add an extra
              blanket of security to your accounts.
              <br />
              <br />• 2FA is, at its most basic, an identity verification
              software. If you (or the threat actor) enter the correct password
              to your account, 2FA will kick in and require you to verify your
              identity, most often by entering a series of random numbers or
              letters sent to you via SMS (cellphone texts) or by an app.
              <br />
              <br />• Enabling 2FA will keep your account safe even if the
              attacker does gain access to your Password.
            </p>
          </span>
        </div>

        {/* Topic 3 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">3. Keep Apps and Devices Up-to-Date</div>
            <p>
              • App and device updates aren’t just for bringing you cool new
              features; they also often provide important security patches.
              <br />
              <br />• No matter the device–phone, laptop, apps, or even your
              NAS–make sure you always keep them up to date so you don’t get hit
              with malware or zero-day exploits.
              <br />
              <br />• These security patches are important, and keep your
              devices safe from newly discovered vulnerabilities.
            </p>
          </span>
        </div>

        {/* Topic 4 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">
              4. Use Privacy-Focused alternatives to your usual apps
            </div>
            <p>
              • Using privacy-focused apps may not only help prevent you from
              being a victim of cybercrime, but it also allows you to protect
              your personal information from being captured, such as your
              contacts, browsing history, ad interactions, and more.
              <br />
              <br />
              <b>For example:</b>
              <br />
              <br />• Browser: Using Firefox or Brave browser instead of Chrome
              <br />• Search Engine: Duckduck go as an alternative to Google
              <br />• Messaging: Privacy focused apps like Signal instead of
              Facebook Messenger
              <br />• Email: ProtonMail rather than Gmail
            </p>
          </span>
        </div>

        {/* Topic 5 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">
              5. Double-Check Before You Click a Link
            </div>
            <p>
              • Phishing is one of the most common forms of cyber attack.
              Phishing is a form of cyberattack that is delivered mainly by
              email, but also by SMS.
              <br />
              <br />• The threat actor tries to entice you to click a bogus link
              that will take you to a website that’s masquerading as an official
              entity, or even download a virus on your device
              <br />
              <br />• Before you click any link, double-check that it’s the true
              source you want to visit. The difference can be as minor as
              “arnazon.com” and “amazon.com”.
            </p>
          </span>
        </div>

        {/* Topic 6 */}
        <div className="content">
          <span className="c1">
            <div className="subtitle">6. Use a VPN When On Public Wi-Fi</div>
            <p>
              • Public Wi-Fi is a great thing in a pinch, but it's not a good
              idea to connect to a public Wi-Fi network unless you absolutely
              have to. If you do connect to a public Wi-Fi network, make sure
              you connect to a VPN. Otherwise, your traffic may be exposed to
              anyone on that network.
              <br />
              <br />• Worse yet, if you send any sensitive data across the
              network without encryption (like HTTPS), that data could be
              intercepted by the network operator or other people on the
              network. It’s never a good idea to send sensitive data over
              unencrypted HTTP, but it’s especially dangerous to do so on a
              public Wi-Fi network.
              <br />
              <br />• The best solution is to do those sensitive tasks from your
              own private network. If you’re in public and have to do something
              urgent, use your cellular data to play it safe. If that’s not an
              option, it’s a good idea to connect to a VPN.
            </p>
          </span>
        </div>

        {/* Frequently Asked Questions */}
        <h2 style={{ textAlign: "center" }}>
          FREQUENTLY ASKED QUESTIONS 🤔💭:
        </h2>
        <div className="ccon">
          {/* FAQ Card 1 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={warningIcon}
                  alt="pic"
                  style={{ width: "50px", height: "50px" }}
                />
                <br />
                What should I do if my computer gets hacked?
              </div>
              <div className="flip-card-back">
                <p>
                  • Don't panic & focus on what you can do.
                  <br />
                  • Don't turn off the device, it destroys evidence that could
                  help uncover who the attackers were and what they've done.
                  <br />
                  • Turn off your device's network connections, to prevent the
                  attacker from using your device to infiltrate deeper into the
                  network.
                  <br />
                </p>
              </div>
            </div>
          </div>
          {/* FAQ Card 2 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={passIcon}
                  alt="pic"
                  style={{ width: "50px", height: "50px" }}
                />
                <br />
                Is it OK to reuse the same password for different accounts?
              </div>
              <div className="flip-card-back">
                <p>
                  <br />
                  <br />
                  Reusing the same passwords for multiple accounts is a{" "}
                  <b>BAD PRACTICE</b> because it opens you up to credential
                  stuffing attacks, which take leaked credentials from one
                  site/service and use them on other sites/services.
                </p>
              </div>
            </div>
          </div>
          {/* FAQ Card 3 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={globeIcon}
                  alt="pic"
                  style={{ width: "50px", height: "50px" }}
                />
                <br />
                Why should I care about Cybersecurity?
              </div>
              <div className="flip-card-back">
                <p>
                  <br />
                  Every 39 seconds, there is a new attack somewhere on the Web.
                  That is about 2,244 attacks that happen on the internet daily!
                  Individuals, governments, companies, organizations, and
                  educational institutions are all at risk of cyberattacks and
                  data breaches. Therefore, Cybersecurity protects all
                  categories of data from theft and damage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SolutionsComponent;
