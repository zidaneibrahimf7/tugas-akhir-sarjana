import React from 'react'
import './Footer.css'
import { FaFacebook, FaMailBulk, FaPhone, FaLinkedin, FaSearchLocation, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-container'>

        {/* left side */}
        <div className='left'>
          <div className='location'>
            <FaSearchLocation size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />
            <div>
              <p>Ilmu Komputer IPB</p>
              <strong>Jl. Meranti, Wing 20 Level 5 Kampus IPB
                Dramaga Bogor 16680
              </strong>
            </div>
          </div>
          <div className='phone'>
            <h4><FaPhone size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />0251-8625584</h4>
          </div>
          <div className='email'>
            <h4><FaMailBulk size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />ilkom@apps.ipb.ac.id</h4>
          </div>
        </div>

        {/* Right side */}
        <div className='right'>
          <h4>Sekilas tentang Aplikasi</h4>
          <p>"Temukan informasi terkini tentang kondisi jalan provinsi Jawa Barat melalui aplikasi kami yang memudahkan Anda dalam merencanakan perjalanan dengan aman dan nyaman."
          </p>
          <div className='social'>
            <FaFacebook size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />
            <FaTwitter size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />
            <FaLinkedin size={20} style={{ color: '#ffffff', marginRight: '2rem' }} />
          </div>
        </div>
      </div>
      <div className='copyRight'>
        <p>Copyright by Zidane Ibrahim Fadela @2023</p>
      </div>
    </div>
  )
}

export default Footer