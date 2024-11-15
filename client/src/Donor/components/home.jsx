import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NgoCard from "./NgoCard"; // Assuming NgoCard is already styled
import "../styles/home.css";

const DonorHome = () => {
  const [ngos, setNgos] = useState([]);
  const [loadingNgos, setLoadingNgos] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await fetch("/api/ngos");
        const data = await response.json();

        // Only show NGOs with approved status
        const approvedNgos = data.filter((ngo) => ngo.status === "approved");
        setNgos(approvedNgos);
      } catch (error) {
        setErrorMessage("Error fetching NGOs");
      } finally {
        setLoadingNgos(false);
      }
    };

    fetchNgos();
  }, []);

  return (
    <div className="home">
      <NavBar isHome={true} />
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* NGO Cards */}
      <div className="ngo-cards">
        <h2>Our Approved NGOs</h2>
        {loadingNgos ? (
          <p>Loading NGOs...</p>
        ) : ngos.length > 0 ? (
          ngos.map((ngo) => <NgoCard key={ngo.ngo_id} ngo={ngo} />)
        ) : (
          <p>No approved NGOs available.</p>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DonorHome;
