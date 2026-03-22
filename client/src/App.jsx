import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SearchPage } from "./pages/Search";
import { ProviderProfile } from "./pages/ProviderProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
