import React, { useEffect, useState } from 'react'

function Admin() {
  const [alluser,setAlluser]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/admin", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          setAlluser(data)
          //localStorage.setItem('token',data.data)

          console.log(data, "admin data");
          //navigate('/')
        });
  },[])

  const handledelet=()=>{

  }


  console.log(alluser.userdetail)
  return (
    <div className="container my-container"> 
      
    {
      alluser.status &&
      alluser.userdetail.map((item)=>{
      return ( 
      <blockquote>
          <div class="card-panel teal lighten-2">
            <li> {item.firstName}</li>
            <li>{item.email}</li>
            <button className='red btn' onClick={handledelet}>Delet</button>
           </div>
       </blockquote>)
      })
    
    }
    
    </div>
  )
}

export default Admin