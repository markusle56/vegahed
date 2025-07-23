import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="h-48 bg-[#7C0A02] py-6 px-24 text-white flex items-start gap-x-20">
      <div className="gap-y-2.5">
        <h1 className="text-2xl">Contact Me</h1>
        <br />
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faInbox} size="2xs" style={{ color: "#ffffff" }} className="max-h-5 max-w-5" />
          <a href="mailto:anhkhoa.wm@gmail.com" className="hover:underline">Email</a>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faLinkedin} style={{ color: "#ffffff" }} className="max-h-5 max-w-5" />
          <a href="https://www.linkedin.com/in/markus-le-581b55245/" target="_blank" rel="noopener noreferrer" className="hover:underline">Linkedin</a>
        </div>
        <div className="flex gap-4">
          <FontAwesomeIcon icon={faCode} style={{ color: "#ffffff" }} className="max-h-5 max-w-5" />
          <a href="https://markusle56.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
        </div>
      </div>
      <div className="gap-y-2.5">
        <h1 className="text-2xl">Open Source</h1>
        <br />
        <a href="" className="hover:underline">Source code</a>
        <br />
        <a href="/" className="hover:underline">Report an error</a>
      </div>
    </footer>
  );
}