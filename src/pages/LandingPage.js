import { useEffect,useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
import BasicModal from "../components/BasicModal";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useDataContext } from "../context/DataContext";
const LandingPage = props => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [dataA,setDataA] = useState(null);
    const [error,setError] = useState({visible:false,title:"Error",text:"Message",retry:null});
    const [open,setOpen] = useState(false);
    const [state,setState] = useState('ready');
    const {dataApi,data,callApi} = useDataContext();
    const handleClick2 = async () => {
        setLoading(true);
        try {
            const dataA = await (await fetch(`http://127.0.0.1:8082/api/generic/available`)).json()
            setDataA(dataA)
            console.log(dataA);
            if(dataA.isAvailable){
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
            //const data = await (await fetch(`http://127.0.0.1:8082/api/generic/products`)).json();
            callApi('http://127.0.0.1:8082/api/generic/products',callBackContinue)
            //setData(data)
            //console.log(data);
            // navigate to next page
            //navigate('/options');
        }
        catch (err) {
            console.log(err.message)
            setLoading(false);
            setError({...error,visible:true,text:err.message,retry:continuePage});
        }
    }

    const callBackContinue = (error) =>{
        setState('continueOptions')
        /*if(error==false) navigate('/options');
        else{
            setLoading(false);
            setError({...error,visible:true,text:data.data,retry:continuePage});
        }*/
    }

    useEffect(() => {
        console.log('LoadingPage state: '+state)
        if(state==='getApiData'){
            console.log('LoadingPage getApiData: '+dataApi)
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
                    {console.log('DataApi: '+dataApi)}
                    <FooterComponent btnContinue={handleClick} />
                </>
                )
            }
            
        </>
    )
}
export default LandingPage;