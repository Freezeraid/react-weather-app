import ReactDOM from 'react-dom/client';
import { CityContextProvider } from './Context/CityContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CityContextProvider>
    <App />
  </CityContextProvider>
);