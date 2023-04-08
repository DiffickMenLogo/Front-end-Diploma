import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IFullUser, IUser } from '../../models/IUser';
import { registrationAPI } from '../../services/PostService';
import { userSlice } from '../../store/reducers/UserSlice';

export function SignUp() {
    const [registration] = registrationAPI.useRegisterMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();
    const setUser = userSlice.actions.setUser;
    
    interface IResponse {
        data: {
            user: IFullUser
            message: string
        }
        message: string;
        error: {
            message: string;
        }
    }

    const handleSubmit = useCallback(async() => {
        if(!email || !password || !name){
            alert('Пароль, почта или имя не могут быть пустыми');
            return;
        }
        if(!email.includes('@')){
            alert('Почта должна содержать: @gmail.com | @mail.ru | @yandex.ru');
            return;
        }
        const response = await registration({ email, password, name }) as IResponse;
        if(!response.error){
            alert(`${response.data.message}. Авторизуйтесь чтобы продолжить`);
        }else{
            alert('Этот пользователь уже существует');
        }
        
    },[email, password, name]);

    return(
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <h1>RS Lang</h1>
                </div>
                <div className="login-form">
                    <div className="name">
                        <p>Name</p>
                        <input type='text' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="email">
                        <p>Email</p>
                        <input type='text' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password__form">
                        <p>Password</p>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="login__btn" onClick={() => handleSubmit()}>Register</div>
                <Link className='login__register' to='/signin'>Есть аккаунт? Жми на меня!</Link>
            </div>
        </div>
    )
}