import Authorization from "./Authorization";

function Register({onSubmit}) {
    return (<Authorization
        name='login'
        title='Регистрация'
        submitButtonText="Зарегистрироваться"
        onSubmit={onSubmit}
    />)}
export default Register;