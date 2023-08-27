import React from 'react'
import '../components/aboutPages.css'
import { Link } from 'react-router-dom'

// import Moon from '../assets/moon.jpg'
// import Pod from '../assets/pod.jpg'


const TrainingPages = () => {
  return (
    <div className='training'>
      <div className='left'>
        <h1>About App</h1>
        <p>Website ini merupakan sebuah aplikasi berbasis WebGIS yang dirancang untuk memberikan informasi terkini mengenai kondisi jalan suatu wilayah, khususnya kondisi jalan provinsi Jawa Barat. Dalam perkembangannya, aplikasi ini memerlukan pembaruan fitur sehingga pengguna dapat melihat kondisi jalan secara visual.</p>
        <p>Tujuan utama dari aplikasi ini adalah untuk menyajikan model visualisasi peta kondisi jalan provinsi berbasis web untuk menampilkan data secara visual. Dalam hal ini, website ini akan menampilkan data kondisi jalan provinsi Jawa Barat dalam bentuk peta interaktif yang memungkinkan pengguna untuk melihat kondisi jalan pada lokasi tertentu dalam bentuk Foto dan Video yang ditandai dalam peta</p>
        <p>Dalam pengembangan website ini, kami memastikan bahwa website ini dapat diakses oleh pengguna dari berbagai perangkat, termasuk desktop, laptop, dan perangkat seluler. Selain itu, kami juga memastikan bahwa website ini mudah digunakan dan dapat diakses oleh pengguna dengan berbagai tingkat keahlian teknologi.</p>

        <Link to='/contact'><button className='btn'>Contact Us!</button></Link>
      </div>
      <div className='right'>
        <h1>Frequently Ask Questions</h1>
        <h4>Tujuan Aplikasi?</h4>
        <p>menyajikan model visualisasi peta kondisi jalan provinsi berbasis web untuk menampilkan data secara visual.</p>

        <h4>Siapa saja yang terlibat dalam pengembangan aplikasi ini?</h4>
        <p>Aplikasi ini dikembangkan oleh mahasiswa Ilmu Komputer IPB University guna menyelesaikan Tugas Akhir atau Skripsi sebagai syarat kelulusan mahasiswa Ilmu Komputer IPB tersebut.</p>

        <h4>Bagaimana cara penggunaan aplikasi ini</h4>
        <p>Aplikasi ini bersifat open-source sehingga dapat digunakan oleh user cukup dengan mengakses halaman website ini dan dapat digunakan sebagai kemudahan dalam berkendara ataupun penelitian selanjutnya.</p>
      </div>
    </div >
  )
}

export default TrainingPages