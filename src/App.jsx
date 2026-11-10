import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { PageTransition } from "./components/layout/PageTransition";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Treatments } from "./pages/Treatments";
import TreatmentDetails from "./pages/TreatmentDetails";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import { Transformations } from "./pages/Transformations";
import { ClinicExperience } from "./pages/ClinicExperience";
import { Contact } from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/treatments/:id" element={<TreatmentDetails />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/transformations" element={<Transformations />} />
            <Route path="/clinic" element={<ClinicExperience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<BookAppointment />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </PageTransition>
      <Footer />
    </Router>
  );
}

export default App;

