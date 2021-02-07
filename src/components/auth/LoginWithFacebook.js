import React from "react";
import { useLoginPageStyles } from "../../styles";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";

function LoginWithFacebook({color, iconColor}) {
   const classes = useLoginPageStyles();  
   const facebookIcon = iconColor === 'blue' ? FacebookIconBlue : FacebookIconWhite;
    return (
        
    )
}
export default LoginWithFacebook;
