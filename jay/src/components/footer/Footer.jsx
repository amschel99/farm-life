import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="imagef">

      </div>
      {/* <div className="company"><h1 className="coName">Jay Plumbing and Irrigation</h1></div> */}
      <div className="footer__tag">
        <ul>
          <li><a target="blank" href="https://wa.me/+254792213201" className="footer_img"><img className="footer_image" src="https://img.icons8.com/material-outlined/256/whatsapp--v1.png" alt="whatsapp profile" /></a></li>
          <li><a href="https://www.facebook.com/" target='blank' className="footer_img"><img className="footer_image" src="https://img.icons8.com/material-rounded/256/facebook-f.png" alt="facebook profile" /></a></li>
          <li><a href="mailto:farmlife@gmail.com" target="_blank" className="footer_img"><img className="footer_image" src="https://img.icons8.com/ios-filled/256/gmail.png" alt="email profile" /></a></li>
          <li><a href="" target="_blank" className="footer_img"><img className="footer_image" src="https://img.icons8.com/ios-filled/256/google-maps-new.png" alt="maps location" /></a></li>
        </ul>
        <div className="moredetails">
          <p>For more information, call <a className='call' href="tel:0792213201">0792213201</a>.</p>
          <a className="footer__copy" href="#">copyright &copy; 2023</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer