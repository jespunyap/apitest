import { useEffect,useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import BasicModal from "../components/BasicModal";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
const LandingPage = props => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(null);
    const [error,setError] = useState({visible:false,title:"Error",text:"Message",retry:null});
    const [open,setOpen] = useState(false);
    const handleClick = async () => {
        setLoading(true);
        try {
            const data = await (await fetch(`http://127.0.0.1:8082/api/generic/available`)).json()
            setData(data)
            console.log(data);
            if(data.isAvailable){
                setLoading(false);
                setOpen(true);
            }
            else{
                setError({...error,visible:true,text:"Not available",retry:handleClick});    
            }
        } catch (err) {
            console.log(err.message)
            setLoading(false);
            setError({...error,visible:true,text:err.message,retry:handleClick});
        }
    }

    const continuePage = async () => {
        // call next endpoint
        try{
            setOpen(false);
            setLoading(true);
            const data = await (await fetch(`http://127.0.0.1:8082/api/generic/products`)).json();
            setData(data)
            console.log(data);
            // navigate to next page
            navigate('/options');
        }
        catch (err) {
            console.log(err.message)
            setLoading(false);
            setError({...error,visible:true,text:err.message,retry:continuePage});
        }
    }


    /*useEffect(() => {
        fetch('http://127.0.0.1:8082/api/generic/available')
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              setPosts(data);
           })
           .catch((err) => {
              console.log(err.message);
           });
           console.log('useEffect')
     }, []);*/

    return (
        <>
            {loading?<LoadingComponent loading={loading}/>:
                (
                <>
                    <ErrorComponent open={error.visible} title={error.title} text={error.text} retry={error.retry} />
                    <HeaderComponent title="Onboarding" />
                    <BasicModal open={open} btnContinue={continuePage}/>
                    <FooterComponent btnContinue={handleClick} />
                </>
                )
            }
            
        </>
    )
}
export default LandingPage;