// Contact.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTelegram, FaGithub, FaLinkedin, FaEnvelope, FaClock } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000;
  color: #fff;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 3rem;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ContactCard = styled(motion.div)`
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #00ffff;
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  color: #00ffff;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;

const Description = styled.p`
  color: #888;
  text-align: center;
  margin: 0;
`;

const Availability = styled.div`
  margin-top: 3rem;
  padding: 1rem 2rem;
  background: rgba(0, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: #00ffff;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Let's Connect
      </Title>

      <ContactGrid>
        <ContactCard
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <IconWrapper>
            <FaTelegram />
          </IconWrapper>
          <ContactLink href="@HabrielYT" target="_blank">
            Telegram
          </ContactLink>
          <Description>Fast response, available 24/7</Description>
        </ContactCard>

        <ContactCard
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IconWrapper>
            <SiUpwork />
          </IconWrapper>
          <ContactLink href="https://www.upwork.com/freelancers/~0158139b78c118da3a?mp_source=share" target="_blank">
            Upwork
          </ContactLink>
          <Description>Professional freelance profile</Description>
        </ContactCard>

        <ContactCard
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <IconWrapper>
            <FaGithub />
          </IconWrapper>
          <ContactLink href="https://github.com/HabrielStark?tab=repositories" target="_blank">
            GitHub
          </ContactLink>
          <Description>Check out my code & projects</Description>
        </ContactCard>

        <ContactCard
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <IconWrapper>
            <FaEnvelope />
          </IconWrapper>
          <ContactLink href="mailto:gabbikdul@gmail.com">
            Email
          </ContactLink>
          <Description>For business inquiries</Description>
        </ContactCard>
      </ContactGrid>

      <Availability>
        <FaClock />
        <div>
          <h3>Availability</h3>
          <p>UTC+3 (Spain) • Available for projects & collaboration</p>
        </div>
      </Availability>
    </ContactContainer>
  );
};

export default Contact;