
import type { NextPage } from 'next';
import Head from 'next/head';
import './styles.css';

const ContactUs: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Contact us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p className="contact-us-title">Contact us</p>
        <h1 className="title">
        ⭐ PrimAI — Let's Build the Future, Together
        </h1>

        <p className="description">
          Whether you're shaping an idea, scaling a product, or exploring what's next in AI and Web3—we're right here to make it happen.
        </p>

        <p className="description">
          We're more than a tech team. We're partners in building meaningful products that solve real problems and spark real growth.
        </p>

        <hr className="divider" />

        <div className="talk-to-us">
          <h2>📪 Talk to Us</h2>
          <p>We reply within minutes — no bots, just people who care.</p>
          <p>Your Name</p>
          <p>Email Address</p>
          <p>Company / Project Name</p>
          <p>What's On Your Mind?</p>
          <p>Preferred Reply: Email / WhatsApp / Call</p>
          <p>[📧 Send Message]</p>
        </div>

        <hr className="divider" />

        <div className="why-reach-out">
          <h2>🤝 Why Reach Out?</h2>
          <p>Because your ideas deserve a team that can turn them into impact. Here's what we bring to the table:</p>
          <ul>
            <li>📊 Custom AI Tools & Automation Solutions</li>
            <li>🔗 Blockchain & Web3 Development</li>
            <li>🧠 Strategy, Consulting & Product Scaling</li>
            <li>🎓 Education, Training & Empowered Communities</li>
          </ul>
        </div>

        <p className="footer-text">
          Not sure where to begin? No worries. Just start the conversation—we'll help you figure out the rest.
        </p>
        <hr className="divider" />

        <div className="talking-live">
          <h2>📞 Prefer Talking Live?</h2>
          <p>Sometimes one call says more than a hundred messages.</p>
          <p>⏳ Book a free 15-minute strategy call and get clarity, feedback, and a plan.</p>
        </div>

        <hr className="divider" />

        <div className="where-we-operate">
          <h2>🌍 Where We Operate</h2>
          <p>We're global and remote-first, with roots on the ground and vision in the cloud.</p>
          <p>🏢 Home Base: Vijayawada, India</p>
          <p>🌍 Global Hubs: Dubai, UAE</p>
          <p>⚡️ Anytime, Anywhere: Thanks to our decentralized workflow</p>
        </div>

        <hr className="divider" />

        <div className="follow-journey">
          <h2>🔗 Follow the Journey</h2>
          <p>We're building in the open. Join the ecosystem:</p>
          <ul>
            <li>LinkedIn: @primai_official</li>
            <li>X (Twitter): @primaihq</li>
            <li>Instagram: @primai_web3</li>
          </ul>
        </div>

        <hr className="divider" />

        <div className="we-are-primai">
          <h2>🌐 We Are PrimAI</h2>
          <p>
            Driven by curiosity. Built with integrity. Focused on real-world outcomes.
            Let's collaborate. Let's create. Let's lead the next wave of digital
            transformation—together.
          </p>
          <p>Your future is calling. Let's make it real. 🚀</p>
        </div>

        <hr className="divider" />
      </main>
    </div>
  );
};

export default ContactUs;
