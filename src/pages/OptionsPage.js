import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useDataContext } from "../context/DataContext";

const OptionsPage = props =>{
    const navigate = useNavigate();
    const {dataApi} = useDataContext();
    const btnBack = () =>{
        navigate("/");
    }
    return (
        <>
            <HeaderComponent title="Options" />
            <p>Options Page content</p>
            {console.log('OptionsPage: '+dataApi)}   
            <p>{dataApi.product.id}</p>         
            <FooterComponent btnBack={btnBack} />
        </>
        
    )
}
export default OptionsPage;