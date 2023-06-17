import { useState } from "react";
import { useNavigate} from "react-router-dom";
import "../styles/Header.css"
const Header = (props) => {
    const [title, setNoteTitle] = useState("")
    const handleChange = (event) => {
        const newValue = event.target.value
        setNoteTitle(newValue);
    }
    
    const navigate = useNavigate()
    const getHandler = async (item) => {
    
            const response = await fetch(`https://notes-production-670e.up.railway.app/notes/${props.userName}`);
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const data = await response.json()
            const foundData = data.data
            
            navigate("/view", {
                state: {
                    data: foundData,
                    userName: props.userName
                }
            })
    }

    const fetchNotes = () => {
        getHandler()
    }

    const searchHandler = async (value) => {
            const response = await fetch("https://notes-production-670e.up.railway.app/noteTitle", {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok){
                throw new Error("Something went wrong!")
            }
            const data = await response.json()
            navigate("/view", { 
                state: { 
                    data: data.data,
                    userName: props.userName
                } 
            });

        }
    const handleSearch = () => {
        const noteObj = {
            noteTitle: title,
            userName: props.userName
        }
        searchHandler(noteObj)
    }

    const logOut = () => {
        navigate("/login", {replace: true})
        localStorage.clear();
    }


    return (
        <div className="header">
            <h1>Notes...</h1>
            <h2>Welcome {props.userName}</h2>
            <div className="options">
                <div className="input-search">
                    <input type="search" placeholder="Enter note title" onChange = {handleChange} value = {title}/>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <button onClick={fetchNotes}>View notes</button>
                <button onClick={logOut}>Sign out</button>
            </div>
        </div>
    )
}

export default Header
