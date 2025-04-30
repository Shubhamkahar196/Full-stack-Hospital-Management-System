import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>About Us</p>
          <h3>Our Mission</h3>
          <p>
          At ZEE CARE Medical Insitutue, our mission is to provide high-quality patient care
            and improve the health and well-being of our community.

          </p>
          {/* <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p> */}
          <p>
          We are a team of dedicated healthcare professionals who are passionate
            about delivering exceptional care and service to our patients.

          </p>
          {/* <p>Lorem ipsum dolor sit amet!</p>
          <p>Coding is fun!</p> */}
        </div>
      </div>
    </>
  );
};

export default Biography;
