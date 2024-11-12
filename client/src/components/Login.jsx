// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import '../styles/Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false); // For card flip

//   // Handle login logic
//   const handleLogin = () => {
//     if (username === 'admin' && password === 'password') {
//       Swal.fire({
//         title: 'Welcome!',
//         text: 'You have logged in successfully.',
//         icon: 'success',
//       });
//     } else {
//       Swal.fire({
//         title: 'Error!',
//         text: 'Invalid username or password.',
//         icon: 'error',
//       });
//     }
//   };

//   // Handle register logic (for simplicity, just a basic log)
//   const handleRegister = () => {
//     Swal.fire({
//       title: 'Registered!',
//       text: 'You have successfully registered.',
//       icon: 'success',
//     });
//   };

//   return (
//     <div className="section full-height">
//       <div className={`card-3d-wrap ${isFlipped ? 'flipped' : ''}`}>
//         <div className="card-3d-wrapper">
//           {/* Front of the card: Login Form */}
//           <div className="card-front">
//             <div className="center-wrap">
//               <h2>Login</h2>
//               <form>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="form-style"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-style"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <button
//                     type="button"
//                     onClick={handleLogin}
//                     className="btn"
//                   >
//                     Login
//                   </button>
//                 </div>
//               </form>
//               <p onClick={() => setIsFlipped(true)}>Don't have an account? Sign Up</p>
//             </div>
//           </div>

//           {/* Back of the card: Register Form */}
//           <div className="card-back">
//             <div className="center-wrap">
//               <h2>Register</h2>
//               <form>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="form-style"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-style"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <button
//                     type="button"
//                     onClick={handleRegister}
//                     className="btn"
//                   >
//                     Register
//                   </button>
//                 </div>
//               </form>
//               <p onClick={() => setIsFlipped(false)}>Already have an account? Login</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
