import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import SiteChrome from '../components/layout/SiteChrome'
import Hero from '../components/Hero/Hero'
import TrustBar from '../components/TrustBar/TrustBar'
import ProblemStatement from '../components/ProblemStatement/ProblemStatement'
import BarrierScience from '../components/BarrierScience/BarrierScience'
import ProductReveal from '../components/ProductReveal/ProductReveal'
import ProductBenefits from '../components/product/ProductBenefits'
import ProductTexture from '../components/product/ProductTexture'
import ProductHowToUse from '../components/product/ProductHowToUse'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import SkinQuiz from '../components/SkinQuiz/SkinQuiz'
import FAQAccordion from '../components/FAQAccordion/FAQAccordion'
import EmailCapture from '../components/EmailCapture/EmailCapture'
import FinalCTA from '../components/FinalCTA/FinalCTA'

const BeforeAfter = lazy(() => import('../components/BeforeAfter/BeforeAfter'))
const IngredientDive = lazy(() => import('../components/IngredientDive/IngredientDive'))
const CoASection = lazy(() => import('../components/CoASection/CoASection'))
const RelatedProducts = lazy(() => import('../components/product/RelatedProducts'))
const BundleSection = lazy(() => import('../components/BundleSection/BundleSection'))
const Testimonials = lazy(() => import('../components/Testimonials/Testimonials'))
const FounderSection = lazy(() => import('../components/FounderSection/FounderSection'))

const AiGuide = lazy(() => import('../components/AiGuide/AiGuide'))
const EmailPopup = lazy(() => import('../components/EmailPopup/EmailPopup'))
const AuthModal = lazy(() => import('../components/AuthModal/AuthModal'))
const AuthHandler = lazy(() => import('../components/AuthHandler/AuthHandler'))

export default function HomePage() {
  return (
    <SiteChrome>
      <Helmet>
        <title>AMAZIA Skincare — Restore. Strengthen. Reveal.</title>
        <meta
          name="description"
          content="Barrier-support skincare formulated for Pakistani skin. GMP + ISO + Halal. Ectoin 0.5%, Ceramide NP 2.5%, CoA every batch. COD nationwide."
        />
        <link rel="canonical" href="https://amaziagrid.com/" />
        <meta property="og:title" content="AMAZIA Skincare — Restore. Strengthen. Reveal." />
        <meta property="og:url" content="https://amaziagrid.com/" />
        <meta property="og:image" content="https://amaziagrid.com/og-image.webp" />
      </Helmet>
      <Suspense fallback={null}>
        <AuthHandler />
      </Suspense>
      <main>
        <Hero />
        <TrustBar />
        <ProblemStatement />
        <BarrierScience />
        <ProductReveal />
        <ProductBenefits />
        <ProductTexture />
        <ProductHowToUse />
        <HowItWorks />
        <Suspense fallback={null}>
          <BeforeAfter />
          <IngredientDive />
          <CoASection />
          <RelatedProducts />
          <BundleSection />
          <Testimonials />
          <FounderSection />
        </Suspense>
        <SkinQuiz />
        <FAQAccordion />
        <EmailCapture />
        <FinalCTA />
      </main>
      <Suspense fallback={null}>
        <EmailPopup />
        <AiGuide />
        <AuthModal />
      </Suspense>
    </SiteChrome>
  )
}
