import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { List } from './pages/List';
import { Detail } from './pages/Detail';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { ToastContainer } from 'react-toastify';

import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { TranslationProvider } from './contexts/TranslationContext';


function App() {
  return (
    <Router>
      <TranslationProvider>

        <Header />
        <div className="flex justify-center mt-5 mb-5">
          <Main />
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
      </TranslationProvider>
    </Router>
  );
}

function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/character/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
