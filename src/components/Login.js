import Authorization from "./Authorization";

function Login({onSubmit}) {
    return (<Authorization
        name='login'
        title='Вход'
        submitButtonText="Войти"
        onSubmit={onSubmit}
    />)
}
export default Login;