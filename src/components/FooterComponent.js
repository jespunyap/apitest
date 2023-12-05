import { Button } from "@mui/material";

const FooterComponent = props => {
    return(
        <div>
            {props.btnBack && <Button variant="text" onClick={props.btnBack}>&lt; Back</Button>}
            {props.btnContinue && <Button variant="contained" onClick={props.btnContinue}>Continue</Button>}
        </div>
    )
}
export default FooterComponent;