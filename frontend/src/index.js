import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Invoice from "./pages/Invoice";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import ICU_Emergency from "./pages/ICU_Emergency";
import Reports from "./pages/Reports";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Dashboard />}>
        <Route path="patients" element={<Patients />} />
         <Route path="appointments" element={<Appointments />} />
         <Route path="doctors" element={<Doctors />} />
         <Route path="invoice" element={<Invoice />} />
         <Route path="pharmacy" element={<Pharmacy />} />
         <Route path="laboratory" element={<Laboratory />} />
         <Route path="emergency" element={<ICU_Emergency />} />
         <Route path="reports" element={<Reports />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
