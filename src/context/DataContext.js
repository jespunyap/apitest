import React, { useEffect, useState } from "react";

const DataCtx = React.createContext(undefined);

const initialState = {
    data: undefined,
    action: undefined,
    error: false,
    url: undefined,
    callBack: undefined,
};

const DataContext = ({children}) => {
    const [state,setState] = useState(initialState);
    const callApi = async () => {
        console.log('Call api: '+state.url)
        let error=false;
        try{
            const res = await (await fetch(state.url)).json();
            console.log(res);
            setState({...state,error:false,data:res,action:'callback'})
        }
        catch (err) {
            error=true;
            console.log(err.message)
            setState({...state,error:true,data:err.message,action:'callback'})
        }
        //if(error) setState({...state,error:true,data:'error',action:'ready'})
        //if(state.callBack) state.callBack(error);
    }

    const callback = ()=>{
        setState({...state,action:'ready'})
        if(state.callBack) state.callBack();
    }

    useEffect(()=>{
        console.log('useEffect: '+state.action)
        if(state.action==='callApi'){
            callApi()
        }
        else if(state.action==='callback'){
            setTimeout(callback,100)
        }
    },[state.action])

    return (
        <DataCtx.Provider value={getCtxValue(state,setState)}>
            {children}
        </DataCtx.Provider>
    )
}

const getCtxValue = (state,setState) => {
    return {
        dataApi: state.data,
        data: {data:state.data,error:state.error},
        callApi: (url,callBack) => setState({...state,action:'callApi',url:url,callBack:callBack}),
    }
};

const useDataContext = () => {
    const c = React.useContext(DataCtx);
    if(c === undefined)
        throw new EvalError('Wrong implementation');
    return c;
}
export { DataContext,useDataContext};
