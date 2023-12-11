import { useEffect,useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import BasicModal from "../components/BasicModal";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useDataContext } from "../context/DataContext";
const LandingPage = props => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState({visible:false,title:"Error",text:"Message",retry:null});
    const [open,setOpen] = useState(false);
    const [state,setState] = useState('ready');
    const {data,callApi} = useDataContext();

    const handleClick = async () => {
        setLoading(true);
        callApi('http://127.0.0.1:8082/api/generic/available',callBackHandleClick)
    }

    const callBackHandleClick = () =>{
        setState('getApiData')
    }

    const continuePage = async () => {
        // call next endpoint
        try{
            setOpen(false);
            setLoading(true);
            callApi('http://127.0.0.1:8082/api/generic/products',callBackContinue)
        }
        catch (err) {
            console.log(err.message)
            setLoading(false);
            setError({...error,visible:true,text:err.message,retry:continuePage});
        }
    }

    const callBackContinue = () =>{
        setState('continueOptions')
    }

    useEffect(() => {
        console.log('LoadingPage state: '+state)
        if(state==='getApiData'){
            if(data.error){
                setLoading(false);
                setError({...error,visible:true,text:data.data,retry:handleClick});
            } 
            else{
                if(data.data.isAvailable){
                    setLoading(false);
                    setOpen(true);
                }
                else{
                    setError({...error,visible:true,text:data.data,retry:handleClick});    
                }

            }
            setState('ready')
        }
        else if(state==='continueOptions'){
            if(data.error){
                setLoading(false);
                setError({...error,visible:true,text:data.data,retry:continuePage});
            }
            else{
                navigate('/options');
            }
            setState('ready')
        }
    },[state])

    return (
        <>
            {loading?<LoadingComponent />:
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