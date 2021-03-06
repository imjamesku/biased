import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from './SignUp.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../_actions/user.actions";
import { useRouter } from "next/router";
import { RootState } from "../../_reducers";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"


const SignUp = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector((state: RootState) => state.registration.registering);
    const dispatch = useDispatch();
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
    const router = useRouter()
    const { executeRecaptcha } = useGoogleReCaptcha()


    useEffect(() => {
        if (loggedIn) {
            router.push('/')
        }
    }, [loggedIn]);

    function resetForm() {
        setSubmitted(false)
        setUser({
            firstName: '',
            lastName: '',
            username: '',
            password: ''
        })
    }


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!executeRecaptcha) {
            window.alert("something went wrong")
            return
        }
        const token = await executeRecaptcha("register")
        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user, token, resetForm));        }

    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit} className={styles.form}>
                <div className="form-group">
                    <input placeholder="First Name" type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className={styles.invalidFeedback}>First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className={styles.invalidFeedback}>Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Username" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className={styles.invalidFeedback}>Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className={styles.invalidFeedback}>Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link href="/signin"><a>Cancel</a></Link>
                </div>
            </form>
        </div>
    );
};
export default SignUp;