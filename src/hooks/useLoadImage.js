import { useState, useEffect, useMemo } from 'react'

export const useLoadImage = (url) => {
    const [isLoading, setIsLoading] = useState(!!url) // true, если url задан
    const [isError, setIsError] = useState(false)
    const [image, setImage] = useState(null)

    useEffect(() => {


        // console.log('useLoadImage');

        // Сброс состояний при новом URL
        setIsLoading(!!url);
        setIsError(false);
        setImage(null);

        if (!url) return;

        const img = new Image()
        img.src = url;

        img.onload = () => {
            setImage(img)
            setIsLoading(false)
        };

        img.onerror = (e) => {
            setIsError(true)
            setIsLoading(false)

            console.log(e)
        };



        return () => {
            img.onload = null
            img.onerror = null
        };
    }, [url])

    return useMemo(
        () => ({ isLoading, isError, image }),
        [isLoading, isError, image]
    )
}

