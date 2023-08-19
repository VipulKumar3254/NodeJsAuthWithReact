"use client"
import "./globals.css"
import mainCSS from "./page.module.css"
import Router, { useRouter } from "next/navigation"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import Cookies from "js-cookie"
import { Truculenta } from "next/font/google";


export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {

    if (!Cookies.get("authToken")) {
      console.log(Cookies.get("authToken"));
      router.push("/signin")
    }
    else {
      setAuthenticated(true)
    }
  }, [])


  return (
    <>
      <div className={mainCSS.mainContainer}>
        <div className={mainCSS.success}>
          {authenticated && <h1>Hii you have logged in Successfully</h1>}
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
