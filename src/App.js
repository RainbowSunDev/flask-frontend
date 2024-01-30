import React, { useContext, useEffect } from 'react';
import globalContext from './context/global/globalContext';
import MainLayout from '../src/layouts/_MainLayout'
import RoutesComponent  from '../src/components/RoutesComponent'
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const { isLoading, setIsLoading } = useContext(globalContext);

  useEffect(() => {
    // Logic to determine loading state
    setIsLoading(true); // Start loading
    // Simulating a fetch/load operation
    setTimeout(() => {
      setIsLoading(false); // Stop loading after some time
    }, 1000);
  }, []);

  return (
    <>
      {isLoading && 
        <LoadingScreen size={25}/>}
        <div className='bg-[#fafafa]'>
            <MainLayout>
              <RoutesComponent />
            </MainLayout>
        </div>
      
    </>
  );
}

export default App;
