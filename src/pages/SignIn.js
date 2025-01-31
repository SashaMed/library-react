import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import SignUpButton from '../components/ui/SignUpButton';
import useAuthentication from '../hooks/useAuthentication';

const SIGN_IN_URL = '/users/auth';
const SIGN_IN_METHOD = 'get';

export default function SignIn() {
    const intl = useIntl();

    const { setAuthentication } = useAuthentication();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const loginRef = useRef();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [login, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassword('');
        try {
            const response = await axios.request({
                method: SIGN_IN_METHOD,
                url: SIGN_IN_URL,
                data: {},
                auth: {
                    username: login,
                    password: password
                }
            });

            const roles = response?.data?.roles;
            setAuthentication({ login, password, roles });

            axios.interceptors.request.clear();
            axios.interceptors.request.use(
                (config) => {
                    return {
                        ...config,
                        auth: {
                            username: login,
                            password: password
                        }
                    }
                },
                (error) => Promise.reject(error)
            );

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError('Missing login or password');
                    break;
                case 401:
                    setError('Invalid credentials');
                    break;
                default:
                    setError('Authentication failed');
            }
        }
    }

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} ref={loginRef} placeholder={intl.formatMessage({ id: "loginLocale" })} required />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={intl.formatMessage({ id: "passwordLocale" })} required />
                {error &&
                    <div className="error-message">{error}</div>
                }
                <button type="submit"><FormattedMessage id="signInLocale" /></button>
                <Link to="/sign-up">
                    <SignUpButton />
                </Link>
            </form>
        </section>
    )
}
