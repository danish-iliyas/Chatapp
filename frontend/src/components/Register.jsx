import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate()
    // const {setAuthUser} = useAuth();
    const [loading , setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        password: '',
        confpassword: '',
        gender: ''
        // Add other fields as needed
    });

    const handelInput=(e)=>{
        setInputData({
            ...inputData , [e.target.id]:e.target.value
        })
    }
// console.log(inputData);
    const selectGender=(selectGender)=>{
        setInputData((prev)=>({
            ...prev , gender:selectGender === inputData.gender ? '' : selectGender
        }))
    }
       

         

    const handelSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
    //    console.log(inputData , "inputData hai");
        // if (!username || !email || !password || !confirmpassword) {
        //     toast({
        //       title: "Please Fill all the Feilds",
        //       status: "warning",
        //       duration: 5000,
        //       isClosable: true,
        //       position: "bottom",
        //     });
        console.log("inputData before checking:", inputData);
        console.log("Confirm Password:", inputData.confpassword);
        
        if (!inputData.password || !inputData.confpassword || 
            inputData.password.trim().toLowerCase() !== inputData.confpassword.trim().toLowerCase()) {
            setLoading(false);
            return toast.error("Password doesn't match");
        }
        
        
        
        try {
            const register = await axios.post("http://localhost:3000/api/v1/register",inputData);
            const data = register.data;

            // console.log(data.status , "status hai");
            alert(data.message)
            
            // toast({
            //     title: data?.message || "Success!", // Provide a default message if data.message is undefined
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });

            localStorage.setItem('chatapp',JSON.stringify(data))
            //setAuthUser(data)
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message)
                console.log(error.response.status , "error hai");
                // toast({
                //     title: error.response.data.message || "An error occurred!", // Use the error message from the response
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                //     position: "bottom",
                // });
                // return; // Exit after showing the error toast
            }
        
            // Log the error and show a generic error message
            console.log(error);
            // toast({
            //     title: error?.response?.data?.message || "An unexpected error occurred!",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            // console.log(error);
           
        }
    }

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        // console.log(pics , "pics hai");
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dqgbe6c3o");
          fetch("https://api.cloudinary.com/v1_1/dqgbe6c3o/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
             console.log(data );
             setInputData({
                ...inputData,
                profilepic: data.url
                       });
            //   console.log(pics.type , "hdsajkhdshdshjd");
         
            //   console.log(inputData , "inputData hai"); ;
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
      };
      useEffect(() => {
        console.log(inputData.profilepic, "profilePic hai");
    }, [inputData.profilepic]);  
  return (
    <div className='flex flex-col items-center justify-center mix-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
          bg-gray-400 bg-clip-padding
           backderop-filter backdrop-blur-lg bg-opacity-0'>
  <h1 className='text-3xl font-bold text-center text-gray-300'>Register
                    <span className='text-gray-950'> Chatters </span>
                    </h1>
                    <form onSubmit={handelSubmit} className='flex flex-col text-black'>
                    <div > 
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>fullname :</span>
                            </label>
                            <input
                                id='fullname'
                                type='text'
                                onChange={handelInput}
                                placeholder='Enter Full Name'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded'  />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>username :</span>
                            </label>
                            <input
                                id='username'
                                type='text'
                                onChange={handelInput}
                                placeholder='Enter UserName'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>Email :</span>
                            </label>
                            <input
                                id='email'
                                type='email'
                                onChange={handelInput}
                                placeholder='Enter email'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>Password :</span>
                            </label>
                            <input
                                id='password'
                                type='password'
                                onChange={handelInput}
                                placeholder='Enter password'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded' />
                        </div>
                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>Conf.Password :</span>
                            </label>
                            <input
                                id='confpassword'
                                type='password'
                                onChange={handelInput}
                                placeholder='Enter Confirm password'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded' />
                        </div>

                        <div
                         id='gender' className="flex gap-2">
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-gray-950">male</span>
                        <input 
                        onChange={()=>selectGender('male')}
                        checked={inputData.gender === 'male'}
                        type='checkbox' 
                        className="checkbox checkbox-info p-2 rounded"/>
                        </label>
                        <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-gray-950">female</span>
                        <input 
                        checked={inputData.gender === 'female'}
                        onChange={()=>selectGender('female')}
                        type='checkbox' 
                        className="checkbox checkbox-info p-2 rounded"/>
                        </label>
                        </div>

                        <div>
                            <label className='label p-2' >
                                <span className='font-bold text-gray-950 text-xl label-text'>Select Image :</span>
                            </label>
                            <input
                                id='profilepic'
                                type='file'
                               accept="image/*"
                               onChange={(e) => postDetails(e.target.files[0])}
                                placeholder='Select Image'
                                required
                                className='w-full input input-bordered h-10 p-2 rounded' />
                        </div>

                        <button type='submit'
                            className='mt-4 self-center 
                            w-auto px-2 py-1 bg-gray-950 
                            text-lg hover:bg-gray-900 
                            text-white rounded-lg hover: scale-105 p-2 rounded'>
                           {loading ? "loading..":"Register"}
                            </button>
                    </form>

                    <div className='pt-2'>
                        <p className='text-sm font-semibold
                         text-gray-800'>
                            Dont have an Acount ? <Link to={'/login'}>
                                <span
                                    className='text-gray-950 
                            font-bold underline cursor-pointer
                             hover:text-green-950'>
                                    Login Now!!
                                </span>
                            </Link>
                        </p>
                    </div>
           </div>
           </div>
  )
}

export default Register