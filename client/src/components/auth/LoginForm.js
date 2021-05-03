import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'


function LoginForm() {
    const {loginUser} = useContext(AuthContext)

    // const history = useHistory()

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const { username, password } = loginForm

    const [alert, setAlert] = useState(null)


    const onChangeLoginForm = e => setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value 
    })
    
    const login = async e => {
        e.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success){
                // history.push('/dashboard')
            }
            else {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    
    return (
        <>
            <Form className='my-4' onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                    <Button variant='success' type='submit'>Login</Button>
                </Form.Group>
            </Form>
            <p>Don't have an account?
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
