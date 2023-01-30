import { LoginForm } from "../Components/AuthComponents/LoginForm"
import LoginPageStyle from './LoginPageStyle.module.css'
export const LoginPage =()=>{
const style = LoginPageStyle
    return(<div className={style.container} >
        <div className={style.adsContainer}> <h1>E-invoices online</h1></div>
        <LoginForm/>
    </div>)


}