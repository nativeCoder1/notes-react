import './App.css';
import Login from './pages/Authentication/components/Login';
import Register from './pages/Authentication/components/Register';
import {Route, Routes} from 'react-router-dom';
import NoteApp from './pages/Note/component/NoteApp';
import Footer from './Reusables/Footer';
import ViewNotes from './pages/Note/component/ViewNotes';
import NoteView from './pages/Note/component/NoteView';
import Note from './pages/Note/component/Note';
import ForgotPassword from './pages/Authentication/components/ForgotPassword';
import EmailComponent from './pages/Authentication/components/EmailComponent';


function App() {
  return (
    <div>

    <Routes>
      <Route path='/' element = {<Register />}/>
      <Route path='/register' element = {<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/note' element = {<NoteApp />} />
      <Route path='/view' element = {<ViewNotes />} />
      <Route path='/note-view' element = {<NoteView />} />
      <Route path='/note-box' element = {<Note />} />
      <Route path='/forgot-password' element={<ForgotPassword />}/>
      <Route path="/email" element={<EmailComponent />}/>
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
