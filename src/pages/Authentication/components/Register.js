import { useState } from "react"
import "../styles/Authentication.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Modals from "../../../Reusables/Modals"
const Register = () => {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [modal, showModal] = useState(false)
    const [notification, setNotification] = useState("")

    const navigate = useNavigate()
    const handleChange = (event) => {
        const {name, value} = event.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        }) 
    }

    const postHandler = async (value) => {
        try{
        const response = await fetch("https://notes-production-9af1.up.railway.app/register", {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
              },
        });
        const data = await response.json()
        if (!data.statusCode === 'OK'){
            throw new Error("Username/email exists")
        }
        alert(data.data.message)
        navigate("/login")
        }catch(error){
            setErrorMessage("Email might have been used.\nInvalid email or password.\nPassword must contain a lower case, symbol, digit and must be at least 8 character long")
        }
    }

    const handleSubmit = (event) => {
        setError(!error)
        event.preventDefault()
        const newUserData = {
            userName: userData.userName,
            email: userData.email,
            password: userData.password
        }
        if (userData.password === userData.confirmPassword){
            postHandler(newUserData)
        }else{
            showModal(!modal)
            setNotification("Password do not match!")
            return
        }

    }

  return(
    <div>
        <h1><em>Notes...</em></h1>
        <div className="form-div">
        {modal && <Modals notification={notification}/>}
        {error && <Modals notification={errorMessage}/>}
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
            <input name = "userName" type="text" placeholder="Username" value={userData.userName} onChange = {handleChange} required/>
            <input name = "email" type="email" placeholder="Email" value={userData.email}  onChange = {handleChange} required/>
            <input name = "password" type="password" placeholder="Password" value = {userData.password}   onChange = {handleChange} required/>
            <input name = "confirmPassword" type="password" placeholder="Confirm Password" value={userData.confirmPassword} onChange = {handleChange} required/>
            <button type="submit">Register</button>
        </form>
            <p>Registered? <Link className = "link" to="/login">Sign in</Link></p>
        </div>
    </div>
  );
}

export default Register;
