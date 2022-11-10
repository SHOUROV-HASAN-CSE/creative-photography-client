
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/gallery/gallery (1).jpg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider } from 'firebase/auth';
import { TabTitle } from '../../Utilitis/FunctiionTitle';


const Login = () => {
    TabTitle('Login');

  const googleProvider = new GoogleAuthProvider();
    const {login, providerLogin} = useContext(AuthContext);


    const handleGoogleSingIn = () =>{
      providerLogin(googleProvider)
      .then(result=>{
        const user = result.user;
        toast('Login with Google Successfully.....',{position:"top-center"});
        console.log(user);
      })
      .catch(error =>console.error(error)) 
    }


    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
        .then( result => {
            const user = result.user;
            form.reset();
            console.log(user);
            toast('Login Successfully.....',{position:"top-center"});
            
        })
        .catch(error => {console.error(error)
          toast(error.message,{position:"top-center"});
        })
    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-2/3 rounded-2xl' src={image} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="Email" className="input input-bordered input-success" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered input-error" />
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-success" type="submit" value="Login" />

                            <button onClick={handleGoogleSingIn} className="btn btn-warning mt-3">Login With Google</button>  
                        </div>
                    </form>
                    <p className='text-center'>New!! Create an Account <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                </div>
                  
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;