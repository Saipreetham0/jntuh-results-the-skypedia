// "use client";

// import React, { useState } from "react";
// import axios from 'axios';
// // import Loading from "../components/Loading/Loading";
// import { useRouter } from 'next/router'
// // import url from "../components/api/api"
// // import StudentDataCard from "../components/StudentDataCard/StudentDataCard";
// // import Hr from "../components/Hr/Hr";
// // import HomeInfo from "../components/Home/HomeInfo";
// import Head from 'next/head';
// // import Alert from "../components/Home/Banner";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import redisurl from "../components/api/api2";

// const HomeStudentDataCard = ({ homepage }) => {
//   const router = useRouter();
//   const [htno, setHtno] = useState("");
//   const [warning, setWarning] = useState("");

//   const submit = async () => {
//     if (htno.length !== 10) {
//       setWarning("The Hall Ticket Should be 10 digits");
//     } else {
//       setWarning("");
//       homepage(<Loading />);
//       try {
//         // localStorage.clear();
//         const storedData = localStorage.getItem(htno);
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           const { data, expiryTimestamp } = parsedData;
//           console.log('Taking From Cache');
//           console.log('Cache expiry ', new Date(expiryTimestamp));
//           if (expiryTimestamp > Date.now()) {
//             homepage(<StudentDataCard query={data} />);
//             return;
//           } else {
//             console.log('Cache Expired : Cached Cleared...');
//             localStorage.removeItem(htno);
//           }
//         }
//         // Check if data is available in Redis cache
//         try {
//           const redisResponse = await axios.get(redisurl + `/api/redis?htno=` + htno, { mode: 'cors' });
//           if (redisResponse.data && redisResponse.data !== "Internal server error" && redisResponse.data !== "Data not found in cache") {
//             // Data is available in Redis, store it in localStorage for future use
//             const expiryDate = new Date();
//             // expiryDate.setSeconds(expiryDate.getSeconds() + 30); // Set expiry date to 30 seconds from now
//             expiryDate.setMinutes(expiryDate.getMinutes() + 15);
//             const dataToStore = {
//               data: redisResponse.data,
//               expiryTimestamp: expiryDate.getTime(),
//             };
//             localStorage.setItem(htno, JSON.stringify(dataToStore));
//             console.log('Redis Cached Successfully..');
//             console.log('Taken From Redis Cache ..');
//             console.log('Cache Expiry', new Date(expiryDate));

//             homepage(<StudentDataCard query={redisResponse.data} />);
//             return;
//           }
//         } catch (error) {
//           console.log('Error fetching data from Redis cache:', error);
//         }

//         // If data is not available in Redis cache or there was an error with Redis, fetch data from the server

//         // alert("kindly wait for 15 minutes and try again")

//         const response = await axios.get(url + '/api/single?htno=' + htno, { mode: 'cors' });

//         // const url = "/api/single?htno=" + htno;
//         // const response = await axios.get(url);

//         if (response.status === 500) {
//           homepage(<><div className="text-[300%]">{response.status} | Server Error</div></>);
//         } else if (response.status === 404 || response.status === 400) {
//           homepage(<><div className="text-[300%]">{response.status} | 404 page Not Found</div></>);
//         } else {
//           // Store the response data and expiry timestamp in local storage
//           const expiryTimestamp = Date.now() + 15 * 60 * 1000; // Set expiry to 15 minutes
//           const dataToStore = { data: response.data, expiryTimestamp };
//           localStorage.setItem(htno, JSON.stringify(dataToStore));
//           console.log('New Data Cached Successfully..');
//           console.log('Cache Expiry', new Date(expiryTimestamp));
//           homepage(<StudentDataCard query={response.data} />);
//         }
//       } catch {
//         toast.warning("Kindly Wait For 15 minutes And Try Again");
//         homepage(<><div
//           style={{
//             marginTop: 100,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <ToastContainer
//             position="bottom-center"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />
//           <p>500 | Please try again later</p>
//           <br />
//           <button onClick={() => window.location.reload()} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >Refresh</button>
//         </div></>);
//       }
//     }
//   };

//   const inputEvent = (event) => {
//     event.target.value = event.target.value.toUpperCase();
//     setHtno(event.target.value);
//   };

//   return (
//     <>
//       <Head>
//         <title>
//           JNTUH | CGPA FINDER
//         </title>
//         <meta
//           name="description"
//           content="Check out academic CGPA with in a go."
//           key="desc"
//         />
//       </Head>
//       <div method="get">
//         <center>
//           <br />
//           <h1 className="mb-2 font-bold text-[180%]">
//             CGPA Calculator
//           </h1>
//           <p>Get Your CGPA and SGPA Of Overall Semesters </p>
//           <br />
//           <input name="htno" onChange={inputEvent} className="border-[1px] m-[9.8px] border-double border-black rounded text-rounded text-center text-[60%]  shadow-xl w-[150px] h-[28px] sm:w-[200px] sm:h-[35px] sm:text-[100%] md:m-0" type="text" maxLength="10" placeholder="Enter your Roll Number" />
//           <br />
//           <p className="text-[60%] text-red-600">{warning}</p>
//           <br />
//           <button type="submit" onClick={submit} className="w-[70px] text-white	bg-blue-700 rounded text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[100px] sm:text-[100%]" >
//             Results
//           </button>
//           <br />
//           <br />
//         </center>
//       </div>
//       <Hr />
//       <HomeInfo />
//       <Alert />
//     </>
//   );
// };


// const HomePage = () => {
//   const homepage = (value) => {
//     setContent(value);
//   };

//   const [content, setContent] = useState(<HomeStudentDataCard homepage={homepage} />);

//   return (
//     <div>
//       {content}
//     </div>
//   );
// };

// export default HomePage;