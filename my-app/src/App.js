import React from 'react';
import HomeView from './components/HomeView';
import { ApplicationContextProvider } from './contexts/ApplicationContext';

const App = () => {
  return (
    <ApplicationContextProvider>
      <HomeView />
    </ApplicationContextProvider>
  )
}

export default App