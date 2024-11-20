import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEnvelope } from 'react-icons/fa'; // Import icons
import '../styles/FindDonations.css'; 
import DefaultDashboard from './DefaultDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedDonations } from '../../Donor/slices/donationSlice';
import {toast} from 'react-hot-toast';

const FindDonations = () => {
  const dispatch = useDispatch()
  const {approvedDonations, status, error} = useSelector((state) => state.donations)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token){
      dispatch(fetchApprovedDonations(token))
    }
  }, [dispatch, token])

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  if (status === 'failed'){
    return <div>Error: {error}</div>
  }

  const handleClick = () => {
    toast.error('Thank you for your interest in donation. To donate kindly register as a donor first')
  }

  return (
    <div>
      <DefaultDashboard/>
      <div>
        <h1>Donation Requests</h1>
        {approvedDonations.length > 0 ? (
          <div>
            {approvedDonations.map((donation) => (
            <div key={donation.request_id}>
              <h3>{donation.title}</h3>
              <p>{donation.description}</p>
              <p><strong>Category:</strong>{donation.category}</p>

              <button onClick={() => handleClick()}>Donate</button>
            </div>
        ))}
      </div>
  ) : (
    <p>No approved donation found</p>
  )}

    </div>
    </div>
  )
  

};

export default FindDonations;
