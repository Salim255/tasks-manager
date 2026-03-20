import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.tsx';
import { ClickOutsideProvider } from './shared/hooks/ClickOutsideProvider.tsx';

createRoot(document.getElementById('root')!).render( 
    <Provider store={store}>
      < ClickOutsideProvider>
        <App />
      </ClickOutsideProvider>
    </Provider>
)
