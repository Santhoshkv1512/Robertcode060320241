
import { createRoot } from 'react-dom/client'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min';
import Configurator from './App';

createRoot(document.getElementById('root')).render(
  <Configurator />
)
