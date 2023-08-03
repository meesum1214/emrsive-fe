import React, { useEffect } from 'react';
import Loader from './Loader';

const withLoader = (WrappedComponent) => {
    const WithLoader = ({ isLoading=true, setIsLoadingFunc, ...props }) => {
        useEffect(() => {
            // Start loading when the isLoading prop is true
            if (isLoading) {
                startLoading();
            }
        }, [isLoading]);

        const startLoading = () => {
            // Replace this with your actual asynchronous task
            setTimeout(() => {
                // setIsLoadingFunc(false);
                isLoading = false;
            }, 2000); // Simulate 2 seconds loading time
        };

        if (isLoading) {
            return <Loader />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithLoader;
};

export default withLoader;
