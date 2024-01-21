import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <GoogleOAuthProvider clientId="423520044675-drslg9jfqpqp1vjluu0emjugmq5i8q9m.apps.googleusercontent.com">
       <App />
     </GoogleOAuthProvider>
)
