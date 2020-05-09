import React, { useEffect } from 'react';
import Axios from 'axios';

function LandingPage() {

    useEffect(() => {
Axios.post('/api/product/getProducs')
  .then(response => {
    if(response.data.success) {

    } else {
      alert('Failed to fetch product datas')
    }
  })
    }, [])

    return (
        <>
        </>
    )
}

export default LandingPage
