import { useState } from 'react';
import LoginForm from './LoginForm'
import Dashboard from './Dashboard';
import './dashboard.css'

const Login = () => {
    // window.localStorage.clear()
    const [correct, setCorrect] = useState(window.localStorage.getItem('admin') === 'true')
    
    return ( 
        <>
        { !correct && <LoginForm correct={correct} setCorrect={setCorrect}/>}
        { correct && <Dashboard />}
        </>
     );
}
 
export default Login;