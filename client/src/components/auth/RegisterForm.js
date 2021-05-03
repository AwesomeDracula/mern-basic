import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    const {registerUser} = useContext(AuthContext)

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const { username, password, confirmPassword} = registerForm

    const [alert, setAlert] = useState(null)

    const onChangeInput = e => setRegisterForm({...registerForm, [e.target.name]: e.target.value})

    const register = async (e) => {
        e.preventDefault()

        try {
            if(password !== confirmPassword){
                setAlert({type: 'danger', message: 'Failed to confirm password'})
                setTimeout(() => setAlert(null), 3000)
                return
            }
            const registerData = await registerUser(registerForm)
            if(register.success){

            }
            else {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <Form className='my-4' onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        required
                        value={username}
                        onChange={onChangeInput}
                    />
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        value={password}
                        onChange={onChangeInput}
                    />
                    <Form.Control
                        type='password'
                        placeholder='Confirm assword'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={onChangeInput}
                    />
                    <Button variant='success' type='submit'>Register</Button>
                </Form.Group>
            </Form>
            <p>Don't have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-2'>Log in</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
