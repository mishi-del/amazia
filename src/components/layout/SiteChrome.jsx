import AnnouncementBar from '../AnnouncementBar/AnnouncementBar'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton'
import StickyMobileCTA from '../product/StickyMobileCTA'

export default function SiteChrome({ children, showStickyCta = true }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      {showStickyCta && <StickyMobileCTA />}
    </>
  )
}
