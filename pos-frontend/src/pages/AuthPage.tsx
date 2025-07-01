import { JSX } from "react";

const LoginForm = (): JSX.Element => {
    return (
        <div className="pos-auth-form">
            <h2>Login</h2>
        </div>
    )
}
const RegisterForm = (): JSX.Element => {
    return (
        <div className="pos-auth-form">
            <h2>Register</h2>
        </div>
    )
}
const AuthPage = (): JSX.Element => {
    return (
        <div className="pos-auth-page">
            <div className="pos-auth-header">
                <h1>POS</h1>
            </div>
            <div className="pos-auth-form">
                <h2>Login</h2>
                <form>
                    <input type="text" placeholder="Username" />
                </form>
            </div>

        </div>
    )
};

export default AuthPage;