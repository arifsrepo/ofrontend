import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Verifie from './Components/Verifie/Verifie';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PhotoGallery from './Components/PhotoGallery/PhotoGallery';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/verifie" element={<Verifie />} />
        <Route path="/gallery/:galleryId" element={<PhotoGallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
