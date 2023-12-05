import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";

const OptionsPage = props =>{
    const navigate = useNavigate();
    const btnBack = () =>{
        navigate("/");
    }
    return (
        <>
            <HeaderComponent title="Options" />
            <p>Options Page content</p>
            <FooterComponent btnBack={btnBack} />
        </>
        
    )
}
export default OptionsPage;