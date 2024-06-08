import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoteDetail from "./pages/NoteDetail";
import AddNote from "./pages/AddNote";
import MyNotes from "./pages/MyNotes";
import EditNote from "./pages/EditNote";
import Protected from "./components/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="max-w-[1440px] mx-auto p-5 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Protected />}>
              <Route path="/my-notes" element={<MyNotes />} />
              <Route path="/add-note" element={<AddNote />} />
              <Route path="/note/:id" element={<NoteDetail />} />
              <Route path="/note/:id/edit" element={<EditNote />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
