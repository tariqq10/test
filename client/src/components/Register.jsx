// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

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

//   return (
//     <div className="section full-height">
//       <div className="card-3d-wrap">
//         <div className="card-3d-wrapper">
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
//             </div>
//           </div>
//           <div className="card-back">
//             {/* Additional content can be added here if necessary */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
