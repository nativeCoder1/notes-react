import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import "../styles/Authentication.css"
const EmailComponent = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const handleChange = (event) => {
        const newEmail = event.target.value
        setEmail(newEmail)
    }
    const postHandler = async (value) => {
        const response = await fetch("https://notes-production-9af1.up.railway.app/email", {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                }
        });
        if (!response.ok){
            alert("This email doesn't exist")
            throw new Error("This email doesn't exist")
        }else{
            alert("Check your email for a token sent you")
            navigate("/forgot-password", {
                state: {
                    email : email
                }
            })
        }
        const data = await response.json()
        console.log(data.data.email)
    }
    const handleClick = (event) => {
        event.preventDefault()
        const emailObj = {
            email : email
        }
        postHandler(emailObj)

    }
    return (
        <div className="form-div">
            <form className="auth-form" onSubmit={handleClick}>
                <h3>Enter your registered email here</h3>
                <input type="email" placeholder = "Enter your email here" onChange= {handleChange} value={email} required/>
                <button type = "submit">Submit</button>
            </form>
            <p>Back to login? <Link className = "link" to="/login">Login</Link></p>
        </div>
    )
}
export default EmailComponent