import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";


export default function Modal(){
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    if (isBrowser) {
        return ReactDOM.createPortal(
            <div>
                <a href="#" onClick={handleCloseClick}>
                    x
                </a>
                Hello from modal
            </div>, 
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }    
  
};