// import React, { useState } from 'react'
// import { Navigate, Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../contexts/authContext'
// import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
// import '../Login/Login.css'

// const Register = () => {

//     const navigate = useNavigate()

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setconfirmPassword] = useState('')
//     const [isRegistering, setIsRegistering] = useState(false)
//     const [errorMessage, setErrorMessage] = useState('')

//     const { userLoggedIn } = useAuth()

//     const onSubmit = async (e) => {
//         e.preventDefault()
//         if(!isRegistering) {
//             setIsRegistering(true)
//             await doCreateUserWithEmailAndPassword(email, password)
//         }
//     }

//     return (
//         <>
//             {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

//             <main className="w-full h-screen flex self-center place-content-center place-items-center">
//                 <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
//                     <div className="text-center mb-6">
//                         <div className="mt-2">
//                             <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
//                         </div>

//                     </div>
//                     <form
//                         onSubmit={onSubmit}
//                         className="space-y-4"
//                     >
//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 autoComplete='email'
//                                 required
//                                 value={email} onChange={(e) => { setEmail(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Password
//                             </label>
//                             <input
//                                 disabled={isRegistering}
//                                 type="password"
//                                 autoComplete='new-password'
//                                 required
//                                 value={password} onChange={(e) => { setPassword(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-800 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-600 font-bold">
//                                 Confirm Password
//                             </label>
//                             <input
//                                 disabled={isRegistering}
//                                 type="password"
//                                 autoComplete='off'
//                                 required
//                                 value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
//                                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
//                             />
//                         </div>

//                         {errorMessage && (
//                             <span className='text-red-600 font-bold'>{errorMessage}</span>
//                         )}

//                         <button
//                             type="submit"
//                             disabled={isRegistering}
//                             className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
//                         >
//                             {isRegistering ? 'Signing Up...' : 'Sign Up'}
//                         </button>
//                         <div className="text-sm text-center">
//                             Already have an account? {'   '}
//                             <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
//                         </div>
//                     </form>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Register



import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import '../Login/Login.css' // Using same external CSS

const Register = () => {

    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match.")
                return
            }
            setErrorMessage('')
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
            } catch (err) {
                setErrorMessage(err.message || "Registration failed.")
                setIsRegistering(false)
            }
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h3>Create a New Account</h3>
                    </div>

                    <form onSubmit={onSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <span className="error-text">{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`submit-btn ${isRegistering ? 'disabled' : ''}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <p className="signup-link">
                            Already have an account? <Link to="/login">Continue</Link>
                        </p>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register
