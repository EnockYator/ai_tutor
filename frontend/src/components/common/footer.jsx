import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function CommonFooter() {
    return (
      <footer className="w-full bg-gray-600 p-4 text-center text-sm text-white">
        <div>
            <Link  to="/terms-of-service">
                <Button variant="secondary" className="bg-transparent hover:bg-transparent text-white hover:text-gray-400 text-sm h-8 px-2">Terms Of Service</Button>
            </Link>
            |
            <Link to="/privacy-policy">
                <Button variant="secondary" className="bg-transparent hover:bg-transparent text-white hover:text-gray-400 text-sm h-8 px-2">Privacy Policy</Button>
            </Link>  
        </div>
        &copy; {new Date().getFullYear()} DoctorsNote. All rights reserved.
      </footer>
    );
  };
  
  export default CommonFooter;