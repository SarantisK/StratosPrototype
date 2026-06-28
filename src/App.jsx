import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Technology from './pages/Technology.jsx'
import Product from './pages/Product.jsx'
import UseCases from './pages/UseCases.jsx'
import Ethics from './pages/Ethics.jsx'
import Newsroom from './pages/Newsroom.jsx'
import About from './pages/About.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="technologie" element={<Technology />} />
        <Route path="produkt" element={<Product />} />
        <Route path="einsatz" element={<UseCases />} />
        <Route path="ethik" element={<Ethics />} />
        <Route path="newsroom" element={<Newsroom />} />
        <Route path="ueber" element={<About />} />
        <Route path="karriere" element={<Careers />} />
        <Route path="kontakt" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
