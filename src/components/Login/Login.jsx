import {useUnit} from "effector-react";
import {$email, loginChanged, $password, passwordChanged, isDisabledChanged, $isDisabled, submit} from "./Login.module.js";

// , $password, loginChanged, passwordChanged, submit
export const Login = () => {
    const {
        email,
        password,
        onChangeLogin,
        onChangePassword,
        onChangeDisable,
        onSubmit,
        isDisabled,
    } = useUnit({
        email: $email,
        password: $password,
        onChangeLogin: loginChanged,
        onChangePassword: passwordChanged,
        onSubmit: submit,
        onChangeDisable: isDisabledChanged,
        isDisabled: $isDisabled
    })

    const loginChangeHandel = (e) => {
        onChangeLogin(e.target.value)
    }
    const passwordChangeHandel = (e) => {
        onChangePassword(e.target.value)
    }

    return (
        <div data-testid='Login'>

            <h2>Login</h2>

            <form>
                <input type="text" placeholder='email' value={email} disabled={isDisabled} onChange={loginChangeHandel}/>
                <input type="text" placeholder='password' value={password} disabled={isDisabled} onChange={passwordChangeHandel}/>
                <button disabled={isDisabled} onClick={onSubmit}>Send</button>
            </form>

            <p>Lorem ipsum</p>
            <button onClick={onChangeDisable} data-testid={'disabled'}>{isDisabled ? 'disabled' : 'submit'}</button>
        </div>
    );
};

