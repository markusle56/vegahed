import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faCode } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="mx-20 px-10">
      <hr className="w-full rounded-2xl border-b-darkred border-b-2 opacity-50 dark:border-b-white"></hr>
      <footer className="h-48 py-6 px-5 text-darkred flex items-start gap-x-20 dark:text-white">
        <div className="gap-y-2.5">
          <h1 className="text-2xl font-rowdies">Contact Me</h1>
          <br />
          
        </div>
        <div className="gap-y-2.5">
          <h1 className="text-2xl font-rowdies">View my code</h1>
          <br />
          <a href="" className="hover:underline">Source code</a>
          <br />
          <a href="/" className="hover:underline">Report an error</a>
        </div>
      </footer>
    </div>
    
  );
}