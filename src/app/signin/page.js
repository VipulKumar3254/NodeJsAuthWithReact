"use client"
import { Subscript } from "@mui/icons-material"
import "./signin.css"
import { Roboto_Condensed } from "next/font/google"
import { useState } from "react"
import Cookies from "js-cookie"
import Router,{ useRouter } from "next/navigation"
const roboto= Roboto_Condensed({
    weight:["300","400"],
    subsets:["latin"]
})
export default function (){
    const [form,setForm]= useState({});
    const router = new useRouter();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let token = Cookies.get("authToken")
        const auther = await  fetch("http://localhost:3001/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        })
        const result = await auther.json();
        if(result.valid)
        {
            console.log("person is authenticated you can redirec it . ");
            Cookies.set("authToken",result.token,{
                expires:Date.now()*60*60,
                sameSite:true,
                
            })
            router.push("/")
        }
        console.log(result);

    }
    const handleInput=(e)=>{
        let obj = {...form}
        setForm({...obj,[e.target.name]:e.target.value})
        console.log(form);
    }
    return (
        <>
        <div className="mainContainer">
            <div style={{position:'relative'}}  >
                {/* <a href="" className="close"></a> */}
                <form onSubmit={handleSubmit} className="form">
                    <h2>Sign In!</h2>
                    <div className="google1" style={{cursor:"pointer"}}>

                    <img height={23} width={20}   src="/google.png" alt="google png " />
                    <div></div>
                    <p className={` ${roboto.className} `}>Google</p>
                    </div>
                    <input type="email" value={form.email|| ""}  onChange={handleInput} placeholder="Email" name="email" id="" />
                    <input type="password" value={form.password || ""} onChange={handleInput} placeholder="Password" name="password" id="" />
                    <input type="submit" className={` ${roboto.className}`}  style={{ cursor:"pointer"}} value="LOG IN" />
                    <p className={` ${roboto.className} forgetPassword`}>Forget Your Password ?</p>
                </form>
                    <div className="lowerSection">
                        <p className={roboto.className} style={{ cursor:"pointer"}}>Don't Have An Account Yet ?</p>
                        <button className={` ${roboto.className} signup `} onClick={()=>{
                            router.push("signup")
                        }}>SIGNUP!</button>
                    </div>
            </div>
        </div>
        </>
    )
}