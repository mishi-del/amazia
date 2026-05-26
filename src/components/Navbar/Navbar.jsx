import { useState, useEffect } from 'react'

import { SHOP_URL } from '../../constants/links'

import { useAuth } from '../../context/AuthContext'

import styles from './Navbar.module.css'



export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)

  const { user, loading, openAuth, logout, isAuthenticated } = useAuth()



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)

  }, [])



  return (

    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>

      <div className={styles.inner}>

        <a href="#" className={styles.logo}>

          AMAZIA

        </a>

        <nav className={styles.nav}>

          <a href="#product" className={styles.link}>

            The Serum

          </a>

          <a href="#ingredients" className={styles.link}>

            Ingredients

          </a>

          <a href="#write-review" className={styles.link}>

            Reviews

          </a>

          {!loading && (

            <div className={styles.authWrap}>

              {isAuthenticated ? (

                <>

                  <span className={styles.userName} title={user.email}>

                    {user.name.split(' ')[0]}

                  </span>

                  <button

                    type="button"

                    className={styles.authBtn}

                    onClick={logout}

                  >

                    Sign out

                  </button>

                </>

              ) : (

                <button

                  type="button"

                  className={styles.authBtn}

                  onClick={() => openAuth('login')}

                >

                  Sign in

                </button>

              )}

            </div>

          )}

          <a href={SHOP_URL} className={styles.shop}>

            Shop — Rs. 3,800

          </a>

        </nav>

      </div>

    </header>

  )

}

