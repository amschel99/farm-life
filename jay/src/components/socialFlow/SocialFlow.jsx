import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "./socialFlow.css";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFlow({}) {
  return (
    <nav style={{zIndex:'1000', backgroundColor:'lightblue', position:'fixed', top:'80vh',left:'90vw', height:'50px'}}>
      <ul style={{left:'40px'}}>
        
      
        
       
        <li>
          <a
            href={`http://wa.me/+254792213201`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i style={{fontSize:'30px', color:'green'}}>
              <FontAwesomeIcon icon={faWhatsapp} className="icon" />
            </i>
            
          </a>
        </li>
      </ul>
    </nav>
  );
}