import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from './components/toasts/ToastContainer';
import { toastStore } from './stores/toast';
import './scss/main.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <App />
    <ToastContainer toasts={toastStore} />
  </>
);
