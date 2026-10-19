function navbar(){
    return <h1>verfiyqr</h1>;
}
export default navbar;
 //use
 import navbar from "./navbar";
 function app(){
    return(
    <>
    <navbar/></>
    );
 }
 //

 import { useEffect, useState } from "react";
 function counter(){
    const[count,setcount]=useState(0);
    return(
        <>
        <h1>{count}</h1>
        <button onClick={()=> setcount(count+1)}>+</button>
        </>

    );
 }
 //login
 const[email,setmail]=usestate("")
 return(
    <>
    <input value={email}
    onChange={(e)=>setemail(e.target.value)} />
    </>
 );
 // useeffect
 import {useEffect} from "react";
 function app(){
    useEffect(()=>{
        console.log("loading");
    },[]);
    return <h1>helllo</h1>;
 }
