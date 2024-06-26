import './App.css';
import {Form} from './components/Form/Form';
import {Input} from './components/Input';
import {Title} from './components/Title/Title';

import {Text} from './components/Text';
import {useCreateUser} from './hooks/use-create-user.js'
import {Login} from "./components/Login/Login.jsx";

function App() {

    const {successMessage, errorMessage, onSubmit, onSuccess, onError} = useCreateUser()
    return (
        <>

            <Login/>
            {/*<Title>Create user</Title>*/}
            {/*<Form onSubmit={onSubmit} onSuccess={onSuccess} onError={onError}>*/}
            {/*    <Input label="User name" name="name"/>*/}
            {/*    <Input label="Password" name="password" type="password"/>*/}
            {/*    <Input type="submit" value="Create user"/>*/}
            {/*</Form>*/}
            {/*{successMessage && <Text isSuccess>{successMessage}</Text>}*/}
            {/*{errorMessage && <Text isError>{errorMessage}</Text>}*/}
        </>
    );
}

export default App;
