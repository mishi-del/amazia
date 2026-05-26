import { AuthProvider } from './context/AuthContext'

import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar'

import Navbar from './components/Navbar/Navbar'

import Hero from './components/Hero/Hero'

import TrustBar from './components/TrustBar/TrustBar'

import ProblemStatement from './components/ProblemStatement/ProblemStatement'

import ProductReveal from './components/ProductReveal/ProductReveal'

import HowItWorks from './components/HowItWorks/HowItWorks'

import BeforeAfter from './components/BeforeAfter/BeforeAfter'

import IngredientDive from './components/IngredientDive/IngredientDive'

import BundleSection from './components/BundleSection/BundleSection'

import Testimonials from './components/Testimonials/Testimonials'

import FAQAccordion from './components/FAQAccordion/FAQAccordion'

import EmailCapture from './components/EmailCapture/EmailCapture'

import EmailPopup from './components/EmailPopup/EmailPopup'

import FinalCTA from './components/FinalCTA/FinalCTA'

import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'

import AuthModal from './components/AuthModal/AuthModal'

import AuthHandler from './components/AuthHandler/AuthHandler'

import AiGuide from './components/AiGuide/AiGuide'



function App() {

  return (

    <AuthProvider>

      <AuthHandler />

      <AnnouncementBar />

      <Navbar />

      <main>

        <Hero />

        <TrustBar />

        <ProblemStatement />

        <ProductReveal />

        <HowItWorks />

        <BeforeAfter />

        <IngredientDive />

        <BundleSection />

        <Testimonials />

        <FAQAccordion />

        <EmailCapture />

        <FinalCTA />

      </main>

      <WhatsAppButton />

      <EmailPopup />

      <AiGuide />

      <AuthModal />

    </AuthProvider>

  )

}



export default App

