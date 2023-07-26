import React,{useState} from 'react'

export default function Dashboard() {
    const [formData,setFormData]=useState({})
    
    const handelChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSumbit=(e)=>{
        e.preventDefault()
        console.log(formData)
    }
  return (
    <div className="container my-container">
        <h5>Data</h5>
        <form onSubmit={handleSumbit}>
            <input
               type="number"
               name='age'
               placeholder='age'
               
               onChange={handelChange}
               required
            />
            <input
               type="number"
               name='salary'
               placeholder='salary'
               
               onChange={handelChange}
               required
            />

            <button className='btn #f57f17 yellow darken-4' type="submit">Predict</button>

        </form>
    </div>
  )
}
