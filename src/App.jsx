import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AnalyticsProvider from './components/tracking/AnalyticsProvider'
import HashScroll from './components/nav/HashScroll'
import HomePage from './pages/HomePage'
import EntityPage from './pages/EntityPage'
import PolicyPage from './pages/PolicyPage'
import NotFound from './pages/NotFound'
import { ENTITY_PAGES } from './constants/brand'

function App() {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <HashScroll />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {ENTITY_PAGES.map((p) => (
            <Route key={p.slug} path={`/${p.slug}`} element={<EntityPage />} />
          ))}
          <Route path="/shipping-policy" element={<PolicyPage />} />
          <Route path="/refund-policy" element={<PolicyPage />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route path="/terms-of-service" element={<PolicyPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnalyticsProvider>
    </AuthProvider>
  )
}

export default App
