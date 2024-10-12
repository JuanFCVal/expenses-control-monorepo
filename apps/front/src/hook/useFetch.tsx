import React, { useState } from 'react'

type methods = 'GET' | 'POST'
interface IUseFetchProps {
    url: string;
    method: methods
}
const useFetch = ({ url, method }: IUseFetchProps) => {
    const [loading, setLoading] = useState(false)

    const genericRequest = async () => {
        setLoading(true)
        try {
            if (method == 'GET') {
                const response = await fetch(url);
                return await response.json();
            }
        } catch {

        } finally {
            setLoading(false)
        }


    }

}

export default useFetch