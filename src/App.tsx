import './App.css';
import React, { useContext, useEffect } from 'react';
import { CityContext } from './Context/CityContext';
import Header from './Header/Header';
import Results from './Results/Results';
import Footer from './Footer/Footer';

function App() {
  const { cityData } = useContext(CityContext);

  const setTheme = () : void => {
    const appElement : HTMLElement | null = document.querySelector(".App");
    if (cityData?.cityIsDayTime) {
      appElement?.classList.replace("Night", "Day")
    } else {
      appElement?.classList.replace("Day", "Night")
    }
  }

  useEffect(() => {
    setTheme();
  }, [cityData]);

  return (
    <div className="App Day">
      <Header />
      <Results/>
      <Footer/>
    </div>
  );
}

export default App;
