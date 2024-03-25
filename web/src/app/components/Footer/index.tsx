import { FaGithub, FaLinkedin } from 'react-icons/fa';

import './styles.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <p>Desenvolvido por Eduardo Alves 💙</p>
      <div className="footer-links">
        <a href="https://github.com/EduardoAlvesNeto/CipherQuest"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/eduardoalvesdev/"><FaLinkedin /></a>
      </div>
    </footer>
  );
};
