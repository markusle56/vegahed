import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';



export default function AuthO() {
    const router = useRouter();

    async function SignIn(providers : string) {
        return await signIn(providers, { redirectTo: "/dashboard" });
    }
    return (
        <div className="h-auto flex mt-5 gap-x-6">
            <FontAwesomeIcon icon={faGooglePlusG} style={{color: "#7c0a02",}} className="h-10 hover:scale-105" size="2x" onClick={() => SignIn("google")}/>
            <a href="https://www.google.com/" className="hover:scale-105" >
                <FontAwesomeIcon icon={faFacebook} style={{color: "#7c0a02",}} className="h-10" size="2x"/>
            </a>
            <a className="hover:scale-105">
                <FontAwesomeIcon icon={faKey} style={{color: "#7c0a02",}} className="h-10" size="2x"/>
            </a>
        </div>
    );
}
