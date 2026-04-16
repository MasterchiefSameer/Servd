import { useState } from "react";
import { toast } from "sonner";
// const useFetch = (callback)
const useFetch = (cb) =>{
    // which we create again and again when we have to call api
    const [data, setData] = useState(null); //loaing
    const [loading, setLoading] = useState(false); //data
    const [error, setError] = useState(null); //error

    const fn = async (...args) =>{
        setLoading(true);
        setError(null);
        // api call, which is the only things that we woluld be needed to call in the end,when we triggereing the api
        // call, which will be use again and again
        try{
            const response = await cb(...args);
            setData(response);
            setError(null);
        }catch(err){
            setError(err);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    return { loading, data, error, fn, setData};
};

export default useFetch;