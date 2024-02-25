import React from "react";
import "./recommendations.css"; // Import CSS file
import logo2 from "../../assets/images/logo2.png";
import braveImg from "../../assets/images/brave.png";
import librewolfImg from "../../assets/images/librewolf.png";
import nordvpnImg from "../../assets/images/nordvpn.png";
import surfsharkImg from "../../assets/images/vpn2.webp";
import adguardImg from "../../assets/images/adblock1.png";
import nextdnsImg from "../../assets/images/nextdns.svg";
import protonmailImg from "../../assets/images/protonmail2.png";
import tutanotaImg from "../../assets/images/tutanota2.png";
import nordpassImg from "../../assets/images/nordpass.png";
import bitwardenImg from "../../assets/images/bitwarden.png";
import braveSearchImg from "../../assets/images/brave.png";
import metagerImg from "../../assets/images/metagear.png";
import sessionImg from "../../assets/images/session.png";
import statusImg from "../../assets/images/status2.png";
import leftArrow from "../../assets/images/left-arrow.png";
import rightArrow from "../../assets/images/right-arrow.png";
import Header from "./Header";

function RecommendationsComponent() {
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
          <b>🔐 BEST PRIVACY TOOLS 🔐</b>
        </h1>
      </div>

      <main>
        {/* Browser Security */}
        <div className="content">
          <div className="subtitle">For a secure Browser:</div>

          <div className="section">
            <span className="c2">
              <img src={braveImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Brave:</b> This is one of the safest browsers on the market
                today. It blocks privacy-invasive ads & trackers. It blocks
                third-party data storage. It protects from browser
                fingerprinting. It upgrades every webpage possible to secure
                https connections. And it does all this by default.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={librewolfImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>LibreWolf:</b> It is designed to increase protection against
                tracking and fingerprinting techniques, while also including a
                few security improvements. This is achieved through their
                privacy and security-oriented settings and patches. It also aims
                to remove all the telemetry, data collection and annoyances, as
                well as disabling anti-freedom features.
              </p>
            </span>
          </div>
        </div>

        {/* Privacy VPN */}
        <div className="content">
          <div className="subtitle">Privacy VPN:</div>

          <div className="section">
            <span className="c2">
              <img src={nordvpnImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Nord VPN:</b> This is the best VPN if you're looking for
                peace of mind when on public Wi-Fi. It helps securely access
                personal information or work files, encrypt your internet
                connection, and keep your browsing history and online identity
                private.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={surfsharkImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>Surfshark:</b> Surfshark is also among the best VPNs. It
                helps with browser privacy, blocks ads and malware, prevents ad
                tracking while also protecting data while using public Wi-Fi.
              </p>
            </span>
          </div>
        </div>

        {/* Ad Blockers */}
        <div className="content">
          <div className="subtitle">Ad Blockers:</div>

          <div className="section">
            <span className="c2">
              <img src={adguardImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>AdGuard:</b> This is a unique desktop program that has all
                the necessary features for the best web experience. The software
                combines the world's most advanced ad blocker for Windows, a
                whole privacy protection module, and a parental control tool —
                all working in any browser or app.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={nextdnsImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>NextDNS:</b> It protects you from all kinds of security
                threats, blocks ads and trackers on websites and in apps
                andprovides a safe and supervised Internet for kids — on all
                devices and on all networks. It also gives protection against
                malware and phishing attacks, cryptojacking and more.
              </p>
            </span>
          </div>
        </div>

        {/* Privacy Emails */}
        <div className="content">
          <div className="subtitle">Privacy Emails:</div>

          <div className="section">
            <span className="c2">
              <img src={protonmailImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Proton Mail:</b> This is a secure email service designed to
                protect your inbox and identity. It encrypts all data on the
                server so that it is rendered useless to anyone without the key
                to decrypt it. That's what makes it different from the big email
                providers like Google's Gmail and Microsoft's Outlook.com.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={tutanotaImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>Tutanota:</b> It is also a secure email service that protects
                your entire mailbox, calendars and address book with automatic
                encryption. It protects your communication from attacks with
                built-in end-to-end encryption. It helps save time and money by
                hosting all your business emails securely on Tutanota's servers
                based in Germany.
              </p>
            </span>
          </div>
        </div>

        {/* Password Manager */}
        <div className="content">
          <div className="subtitle">Password Manager:</div>

          <div className="section">
            <span className="c2">
              <img src={nordpassImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Nord Pass:</b> It helps store passwords in a single place and
                log in to your favorite websites and apps with a click. You can
                access your login credentials on any device, even when you're
                offline. Don't lose access to accounts that matter just because
                you forgot a password — always find it in NordPass.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={bitwardenImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>Bitwarden:</b> : It is also a password manager that gives you
                power to create and manage unique passwords, so you can
                strengthen privacy and boost productivity online from any device
                or location.
              </p>
            </span>
          </div>
        </div>

        {/* Private Search Engine */}
        <div className="content">
          <div className="subtitle">Private Search Engine:</div>

          <div className="section">
            <span className="c2">
              <img src={braveSearchImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Brave Search:</b> It is built on top of an independent index,
                and doesn't track users, their searches, or their clicks.
                Privacy-preserving Brave Search is now replacing Google as the
                default search engine used in the address bar for new Brave
                users in the United States, Canada, and the UK.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={metagerImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>MetaGer:</b> : MetaGer is also a seach engine that protects
                against censorship by combining the results of multiple search
                engines.Their algorithms are transparent and available for
                everyone to read. Their source code is free.
              </p>
            </span>
          </div>
        </div>

        {/* Private Messengers */}
        <div className="content">
          <div className="subtitle">Private Messengers:</div>

          <div className="section">
            <span className="c2">
              <img src={sessionImg} alt="image here" />
            </span>
            <span className="c1">
              <p>
                <b>Session: </b> Session is an end-to-end encrypted messenger
                that minimises sensitive metadata, designed and built for people
                who want absolute privacy and freedom from any form of
                surveillance. It doesn't collect data or phone numbers so
                there's nothing to leak.
              </p>
            </span>
          </div>
          <div className="section">
            <span className="c2">
              <img src={statusImg} alt="image here" />
            </span>

            <span className="c1">
              <p>
                <b>Status:</b> : Status a secure messaging app, crypto wallet
                that uses an open-source, peer-to-peer protocol, and end-to-end
                encryption to protect your messages from third parties. Keep
                your private messages private with Status.
              </p>
            </span>
          </div>
        </div>

        <div>
          <h2>✅ Privacy Apps Check-list:</h2>
          <table width="60%">
            <tr>
              <th>TOOL CATEGORY</th>
              <th>TOOL SUGGESTIONS</th>
            </tr>

            <tr>
              <td>🌐 Browser security</td>
              <td>Brave or LibreWolf</td>
            </tr>
            <tr>
              <td>🔐 Privacy VPN</td>
              <td>Nord VPN or Surfshark</td>
            </tr>
            <tr>
              <td>🚫 Ad Blockers</td>
              <td>AdGuard or NextDNS</td>
            </tr>
            <tr>
              <td>📧 Privacy E-mail</td>
              <td>Proton Mail or Tutanota</td>
            </tr>
            <tr>
              <td>🔑 Password Manager</td>
              <td>Nord Pass or Bitwarden</td>
            </tr>
            <tr>
              <td>🔍 Private Search Engine</td>
              <td>Brave Search or MetaGer</td>
            </tr>
            <tr>
              <td>💭 Private Messengers</td>
              <td>Session or Status</td>
            </tr>
          </table>
        </div>
      </main>
    </div>
  );
}

export default RecommendationsComponent;
