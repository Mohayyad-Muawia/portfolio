import { useEffect, useState } from 'react'

const useFetch = (API_url) => {

    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
            setLoading(true)
            const response = await fetch(API_url);
            if(!response.ok){
                setError('could not fetch the data')
            }
            const json = await response.json();
            setData(json);
            setLoading(false)    
    };
    
    useEffect(() => {
        fetchData();
    }, []);
  
    return {data, loading, error}
}
 
export default useFetch;