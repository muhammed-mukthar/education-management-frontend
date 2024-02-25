import React from "react";
import "./threats.css"; // Import CSS file
import logo2 from "../../assets/images/logo2.png";
import malwareImg from "../../assets/images/malware2.webp";
import socialEngImg from "../../assets/images/socialeng.jpg";
import softwareSupplyImg from "../../assets/images/R.png";
import aptImg from "../../assets/images/apt.jpeg";
import ddosImg from "../../assets/images/ddos.jpg";
import mitmImg from "../../assets/images/man_in_middle2.png";
import passwordAttacksImg from "../../assets/images/crack.jpg";
import leftArrow from "../../assets/images/left-arrow.png";
import rightArrow from "../../assets/images/right-arrow.png";
import Header from "./Header";

function ThreatsComponent() {
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
          <b>🤖 TOP CYBERSECURITY THREATS 🤖</b>
        </h1>
      </div>
      <div className="menu">
        {/* Malware Attack */}
        <div className="items">
          <img
            src={malwareImg}
            alt="image here"
            style={{ aspectRatio: "2/1" }}
          />
          <div className="details">
            <div className="details-sub">
              <h5>Malware attack</h5>
            </div>
            <div className="para">
              Attacks use many methods to get malware into a user's device.
              Users may be asked to take an action, such as clicking a link or
              opening an attachment.
              <br />
              <br />
              Once malware is installed, it can monitor user activities, send
              confidential data to the attacker, assist the attacker in
              penetrating other targets within the network, and even cause the
              user’s device to participate in a botnet leveraged by the attacker
              for malicious intent. <br />
              <br />
              <b>Malware attacks include:</b>
              <br />
              <u>Trojan virus</u> — tricks a user into thinking it is a harmless
              file, but it can launch an attack on a system and can establish a
              backdoor, which attackers can use. <br />
              <u>Ransomware</u> — prevents access to the data of the victim and
              threatens to delete or publish it unless a ransom is paid. <br />
              <u>Worms</u> — this malware is designed to exploit backdoors and
              vulnerabilities to gain unauthorized access to operating systems.{" "}
              <br />
              <u>Spyware</u> — this malware enables malicious actors to gain
              unauthorized access to data, including sensitive information like
              payment details and credentials.
            </div>
          </div>
        </div>

        {/* Social Engineering Attacks */}
        <div className="items">
          <img src={socialEngImg} alt="image here" />
          <div className="details">
            <div className="details-sub">
              <h5>Social engineering attacks</h5>
            </div>
            <div className="para">
              Social engineering attacks work by psychologically manipulating
              users into performing actions desirable to an attacker, or
              divulging sensitive information.
              <br />
              <br />
              <b>Social engineering attacks include:</b>
              <br />
              <u>Phishing</u> — attackers send fraudulent correspondence that
              seems to come from legitimate sources, usually via email, leading
              them to hand over sensitive information to the attacker, or expose
              themselves to malicious downloads. <br />
              <u>Malvertising</u> — online advertising controlled by hackers,
              which contains malicious code that infects a user’s computer when
              they click, or even just view the ad. <br />
              <u>Scareware</u> — a threat actor tricks the victim into thinking
              that their computer is infected with malware. Then, offers the
              victim a solution to fix the fake problem, tricking them into
              installing malware. <br />
              <u>Honey trap</u> — a social engineer assumes a fake identity as
              an attractive person to interact with a target online. The social
              engineer fakes an online relationship and gathers sensitive
              information through this relationship.
            </div>
          </div>
        </div>

        {/* Software Supply Chain Attacks */}
        <div className="items">
          <img
            src={softwareSupplyImg}
            alt="image here"
            style={{ aspectRatio: "2/1" }}
          />
          <div className="details">
            <div className="details-sub">
              <h5>Software supply chain attacks</h5>
            </div>
            <div className="para">
              A software supply chain attack is a cyber attack against an
              organization that targets weak links in its trusted software
              update and supply chain. A supply chain is the network of all
              individuals, organizations, resources, activities, and
              technologies involved in the creation and sale of a product. A
              software supply chain attack exploits the trust that organizations
              have in their third-party vendors, particularly in updates and
              patching.
              <br />
              <br />
              <b>Types of software supply chain attacks:</b>
              <br />
              Compromise of software build tools or dev/test infrastructure
              <br /> Compromise of devices or accounts owned by privileged
              third-party vendors <br /> Malicious apps signed with stolen code
              signing certificates or developer IDs <br /> Malicious code
              deployed on hardware or firmware components <br /> Malware
              pre-installed on devices such as cameras, USBs, and mobile phones
            </div>
          </div>
        </div>

        {/* Advanced Persistent Threats */}
        <div className="items">
          <img src={aptImg} alt="image here" style={{ aspectRatio: "2/1" }} />
          <div className="details">
            <div className="details-sub">
              <h5>Advanced persistent threats (APT)</h5>
            </div>
            <div className="para">
              When an individual or group gains unauthorized access to a network
              and remains undiscovered for an extended period of time, attackers
              may exfiltrate sensitive data, deliberately avoiding detection by
              the organization’s security staff. APTs require sophisticated
              attackers and involve major efforts.
              <br />
              <br />
              <b>Common indicators of an APT presence include:</b>
              <br />
              <u>New account creation</u> — the P in Persistent comes from an
              attacker creating an identity or credential on the network with
              elevated privileges. <br />
              <u>Abnormal activity</u> — legitimate user accounts typically
              perform in patterns. Abnormal activity on these accounts can
              indicate an APT is occurring. <br />
              <u>Backdoor/trojan horse malware</u>
              — use of this method enables APTs to maintain long-term access.
              <br />
              <u>Odd database activity</u> — for example, a sudden increase in
              database operations with massive amounts of data. <br />
              <u>Unusual data files</u>— the presence of these files can
              indicate data has been bundled into files to assist in an
              exfiltration process.
            </div>
          </div>
        </div>

        {/* Distributed Denial of Service (DDoS) */}
        <div className="items">
          <img src={ddosImg} alt="image here" style={{ aspectRatio: "2/1" }} />
          <div className="details">
            <div className="details-sub">
              <h5>Distributed denial of service (DDoS)</h5>
            </div>
            <div className="para">
              The objective of a denial of service (DoS) attack is to overwhelm
              the resources of a target system and cause it to stop functioning,
              denying access to its users. Distributed denial of service (DDoS)
              is a variant of DoS in which attackers compromise a large number
              of computers or other devices, and use them in a coordinated
              attack against the target system.
              <br />
              <br />
              <b>Methods of DDoS attacks include:</b>
              <br />
              <u>Botnets</u> — systems under hacker control that have been
              infected with malware. Attackers use these bots to carry out DDoS
              attacks. Large botnets can include millions of devices and can
              launch attacks at devastating scale. <br />
              <u>Smurf attack</u> — sends Internet Control Message Protocol
              (ICMP) echo requests to the victims IP address. The ICMP requests
              are generated from ‘spoofed’ IP addresses. Attackers automate this
              process and perform it at scale to overwhelm a target system.{" "}
              <br />
              <u>TCP SYN flood attack</u>— attacks flood the target system with
              connection requests. When the target system attempts to complete
              the connection, the attacker’s device does not respond, forcing
              the target system to time out. This quickly fills the connection
              queue, preventing legitimate users from connecting.
            </div>
          </div>
        </div>

        {/* Man-in-the-Middle (MitM) Attacks */}
        <div className="items">
          <img src={mitmImg} alt="image here" style={{ aspectRatio: "2/1" }} />
          <div className="details">
            <div className="details-sub">
              <h5>Man-in-the-middle attack (MitM)</h5>
            </div>
            <div className="para">
              Attackers intercept an existing conversation or data transfer,
              either by eavesdropping or by pretending to be a legitimate
              participant. To the victim, it will appear as though a standard
              exchange of information is underway — but by inserting themselves
              into the “middle” of the conversation or data transfer, the
              attacker can quietly hijack information.
              <br />
              <br />
              <b>MitM attacks include:</b>
              <br />
              <u>Session hijacking</u> — an attacker hijacks a session between a
              network server and a client. The server believes it is
              corresponding with the client and continues the session. <br />
              <u>Replay attack</u>
              — a cybercriminal eavesdrops on network communication and replays
              messages at a later time, pretending to be the user. Replay
              attacks have been largely mitigated by adding timestamps to
              network communications. <br />
              <u>Eavesdropping attack</u> — attackers leverage insecure network
              communication to access information transmitted between the client
              and server. These attacks are difficult to detect because network
              transmissions appear to act normally.
            </div>
          </div>
        </div>

        {/* Password Attacks */}
        <div className="items">
          <img
            src={passwordAttacksImg}
            alt="image here"
            style={{ aspectRatio: "2/1" }}
          />
          <div className="details">
            <div className="details-sub">
              <h5>Password attacks</h5>
            </div>
            <div className="para">
              A hacker can gain access to the password information of an
              individual by ‘sniffing’ the connection to the network, using
              social engineering, guessing, or gaining access to a password
              database. An attacker can ‘guess’ a password in a random or
              systematic way.
              <br />
              <br />
              <b>Password attacks include:</b>
              <br />
              <u>Brute-force password guessing</u> — an attacker uses software
              to try many different passwords, in hopes of guessing the correct
              one. The software can use some logic to trying passwords related
              to the name of the individual, their job, their family, etc.{" "}
              <br />
              <u>Dictionary attack</u>
              — a dictionary of common passwords is used to gain access to the
              computer and network of the victim. <br />
              <u>Pass-the-hash attack</u>— an attacker exploits the
              authentication protocol in a session and captures a password hash
              (as opposed to the password characters directly) and then passes
              it through for authentication and lateral access to other
              networked systems.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreatsComponent;
