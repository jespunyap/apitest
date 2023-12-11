import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useDataContext } from "../context/DataContext";
import LoadingComponent from "../components/LoadingComponent";
import { useState } from "react";

const OptionsPage = props =>{
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {data,setData} = useDataContext();
    const btnBack = () =>{
        navigate("/");
    }
    const callLink = async () =>{
        setLoading(true)
        const res = await (await fetch('http://127.0.0.1:8082/api/generic/products')).json();
        console.log(res);
        setData(res)
        setLoading(false)
    }
    return (
        <>
            {loading?<LoadingComponent />:
                (<>
                    <HeaderComponent title="Options" />
                    <p>Options Page content</p>
                    {console.log('OptionsPage: '+data.data)}   
                    <p>{data.data.product.id}</p>
                    <button onClick={callLink}>Click to call API</button>
                    <FooterComponent btnBack={btnBack} />
                </>)
            }
        </>
        
    )
}
export default OptionsPage;