"use client"
import Cookies from "js-cookie";

import "./signup.css"
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Roboto, Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({
    weight: ["400"],
    subsets: ["latin"]
})
const roboto1 = Roboto_Condensed({
    weight: ["300"],
    subsets: ["latin"]
})

import { CleaningServices } from "@mui/icons-material";
import { Router, useRouter } from "next/navigation";


export default function page() {
    const [formData, setFormData] = useState({});
    const router = useRouter();
    const handleInput = (e) => {
        const obj = { ...formData }
        setFormData({ ...obj, [e.target.name]: e.target.value })
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        let phone = ""
        e.preventDefault();
        if ((formData.email == undefined) || (formData.fullName == undefined) || (formData.phone == undefined) || (formData.city == undefined) || (formData.education == undefined) || (formData.password == undefined)) {

            alert("fill data first")
            return;
        }
        if(!formData.countryCode)
        {
            phone = "+91"+formData.phone;
        }
        else{
            phone = formData.phone;
        }
        console.log(formData);

        try {
            const auth = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    fullName: formData.fullName,
                    password: formData.password,
                    education: formData.education,
                    city: formData.city,
                    phone: phone
                })
                


            })
            const result = await auth.json();
            console.log(result);
            Cookies.set("authToken","bearer "+result.token,{secure:true,expires: Date.now()+60*60,sameSite:"strict",});
            console.log(Cookies.get("authToken"));
        }
        catch (e) {
            alert("some kind of error occured")
            console.log(e);
        }



    }



    const googleSignIn = () => {
        signInWithRedirect(auth, provider);

    }



    return (
        <>
            <div className="formContainer">
                <div style={{ position: "relative" }}>

                    {/* <a href="#" className="close" /> */}
                    <form onSubmit={handleSubmit} >
                        <h2 className={roboto.className}>Create An Account</h2>
                        <div className="google">
                            <img src="/google.png" alt="google png img" width={31} style={{ padding: "7px", backgroundSize: "fill" }} />
                            <div className="line"></div>
                            <p className={roboto.className} onClick={() => { googleSignIn() }}>Google</p>

                        </div>

                        <input type="email" onChange={handleInput} value={formData.email} name="email" placeholder="Email" className={roboto.className} />
                        <input type="text" placeholder="Full Name" className={roboto.className} onChange={handleInput} value={formData.fullName || ""} name="fullName" />
                        <input type="password" placeholder="Password" className={roboto.className} onChange={handleInput} value={formData.password} name="password" />
                        <select id="cars" className={roboto.className} onChange={handleInput} value={formData.education || ""} name="education">
                            <option value="" disabled defaultValue={true} hidden>---highest Education Level---</option>
                            <option value="12th">12th</option>
                            <option value="Graduation">Graduation</option>
                        </select>
                        {/* another  */}
                        <select className={roboto.className} name="city" id="cars" onChange={handleInput} value={formData.city || ""} >
                            <option value="" disabled defaultValue={true} hidden>---Select Your City---</option>

                            <option value="Delhi">Delhi</option>
                            <option value="Sonipat">Sonipat</option>
                        </select>
                        {/* another */}
                        <select className={roboto.className} name="countryCode" id="cars" onChange={handleInput} value={formData.countyCode}>
                            <option value="+91" defaultValue={true} >(+91) India</option>
                            <option value="+1">(+1) USA</option>
                            <option value="+61">(+61) Australia</option>
                        </select>
                        <input className={roboto.className} type="number" placeholder="Enter Numbers" onChange={handleInput} value={formData.phone} name="phone" />  <br />
                        <input className={`${roboto.className} submit`} style={{ paddingBottom: "24px", cursor:"pointer"}} type="submit" value="CREATE NEW ACCOUNT" />
                        <p className={`${roboto1.className} login`} onClick={()=>{
                            router.push("signin")
                        }}>Back To Login</p>
                    </form>

                </div>


            </div>
        </>
    )
}