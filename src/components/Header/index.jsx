'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const button = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => gsap.to(button.current, { scale: 1 }),
        onEnterBack: () => gsap.to(button.current, { scale: 0 }),
      },
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <p>©</p>
          <div className={styles.name}>
            <p>Code by</p>
            <p>Zammit Youssef</p>
          </div>
        </div>
        <div className={styles.nav}>
          {['work', 'about', 'contact'].map((s) => (
            <Magnetic key={s}>
              <div className={styles.el} onClick={() => scrollToSection(s)}>
                <a>{s.charAt(0).toUpperCase() + s.slice(1)}</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          ))}
        </div>
      </div>

      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded onClick={() => setIsActive(!isActive)} className={styles.button}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
