import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/delete.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/delete.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if(form.site.length>2 && form.username.length>2 && form.password.length>2){
        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({"site":"", "username":"", "password":""})
        }
        else{
            toast('Error: Password not saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    const deletePassword = (id) => {
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        console.log("Deleting Password with id ",id)
        let c=confirm("Do you really want to delete your password?")
        if(c){
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }}
    const editPassword=(id)=>{
        console.log("Editing Password with id ",id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"/>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 mycontainer min-h-[83.9vh]">
                <h1 className='text-4xl font-bold text-center text'>
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>OP/&gt;</span>
                </h1>
                <p className='text-lg text-center text-green-800'>Your own Password Manager</p>

                <div className='flex flex-col items-center p-4 text-black gap-7'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='w-full p-4 py-1 border border-green-500 rounded-full' type="text" name="site" id="site" />
                    <div className='flex flex-col justify-between w-full gap-8 md:flex-row'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='w-full p-4 py-1 border border-green-500 rounded-full' type="text" name="username" id="username" />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='w-full p-4 py-1 border border-green-500 rounded-full' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex items-center justify-center gap-2 px-8 py-2 bg-green-500 border border-green-900 rounded-full w-fit hover:bg-green-400'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"></lord-icon>Save Password</button>
                </div>
                <div className='passwords'>
                    <h2 className='py-4 text-2xl font-bold'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="w-full mb-10 overflow-hidden rounded-md table-auto">
                            <thead className='text-white bg-green-900'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 text-center border-white min-w-32'><div className='flex items-center justify-center'><a href="{item.site}" tabIndex='_blank'>
                                            {item.site}</a>
                                            <div className='cursor-pointer lordiconcopy size-7' onClick={() => { copyText(item.site) }}>
                                                <lord-icon style={{ "width": "25px", "hight": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div></td>
                                        <td className='py-2 text-center border-white min-w-32'><div className='flex items-center justify-center'><span>{item.username}</span> <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.username) }}>
                                            <lord-icon style={{ "width": "25px", "hight": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div></td>
                                        <td className='py-2 text-center border-white min-w-32'><div className='flex items-center justify-center'><span>{item.password}</span><div className='cursor-pointer lordiconcopy size-7' onClick={() => { copyText(item.password) }}>
                                            <lord-icon style={{ "width": "25px", "hight": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon></div></div></td>
                                                <td>
                                                    <span className='mx-1 cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{"width":"25px", "hight":"25px"}}></lord-icon>
                                                    </span>
                                                    <span className='mx-1 cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                                        <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{"width":"25px", "hight":"25px"}}></lord-icon>
                                                    </span>
                                                </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
