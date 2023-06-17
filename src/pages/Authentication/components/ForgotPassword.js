import { useState } from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
import "../styles/Authentication.css"
const ForgotPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const value = location.state.email
    const [password,  setPassword] = useState({
        token : "",
        newPassword: "",
        confirmPassword: ""
    })

    const postHandler = async (value) => {
        try{
            const response = await fetch("https://notes-production-670e.up.railway.app/forgot_password", {
                method: 'PUT',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                },
        });
        if (!response.ok){
            throw new Error("Invalid token. Please reconfirm your token")
        }else{
            alert("Password rest successfully")
            navigate("/login")
        } 
        }catch(error){
            alert(error.message)
        }
    }

    const handleChange = (event) => {
        const {name, value} =  event.target
        setPassword(oldPassword => {
            return {
                ...oldPassword,
                [name]: value
            }
        })
    }
    const handleClick = (event) => {
        event.preventDefault()
        if (password.newPassword !== password.confirmPassword){
            alert("Passwords do not match!")
            throw new Error("Passwords do not match")
        }
        const newPassword = {
            email: value,
            newPassword: password.newPassword,
            confirmPassword: password.confirmPassword,
            token: password.token
        }
        postHandler(newPassword)
    }

    return (
        <div className="form-div">
            <h3>Change password</h3>
            <form className="auth-form">
                <input name="token" placeholder="Enter token sent to your mail" onChange={handleChange} value={password.token}/>
                <input name="newPassword" type ="password" placeholder= "New Password" onChange={handleChange} value={password.newPassword} required/>
                <input name="confirmPassword" type ="password" placeholder = "Confirm new password" onChange={handleChange} value={password.confirmPassword} required/>
                <button onClick={handleClick}>Change Password</button>
            </form>
            <p>Back to login? <Link className = "link" to="/login">Login</Link></p>
        </div>
    )
}

export default ForgotPassword