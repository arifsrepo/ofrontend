import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Verifie from './Components/Verifie/Verifie';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PhotoGallery from './Components/PhotoGallery/PhotoGallery';
import NoteOne from './Components/NoteOne/NoteOne';
import NoteTwo from './Components/NoteTwo/NoteTwo';
import SecretRoute from './Components/SecretRoute/SecretRoute';
import AdminControl from './Components/AdminControl/AdminControl';
import Audio from './Components/Audio/Audio';
import useActiveSession from './hooks/useActiveSession';
import OfflineDB from './Components/OfflineDB/OfflineDB';

function App() {

  useActiveSession();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/verifie" element={<Verifie />} />
        <Route path="/AdminControl" element={<ProtectedRoute><AdminControl /> </ProtectedRoute>} />
        <Route path="/gallery/:galleryId/date/:dateId" element={<ProtectedRoute><PhotoGallery /> </ProtectedRoute>} />
        <Route path="/secretroute/gallery/:galleryId" element={<ProtectedRoute><PhotoGallery /> </ProtectedRoute>} />
        <Route path="/noteone" element={<ProtectedRoute><NoteOne /></ProtectedRoute>} />
        <Route path="/notetwo" element={<ProtectedRoute><NoteTwo /> </ProtectedRoute>} />
        <Route path="/secretroute" element={<ProtectedRoute> <SecretRoute /> </ProtectedRoute>} />
        <Route path="/audio" element={<ProtectedRoute> <Audio /> </ProtectedRoute> } />
        <Route path="/offline" element={<ProtectedRoute> <OfflineDB /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
