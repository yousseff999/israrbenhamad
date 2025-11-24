'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion } from 'framer-motion';
import { slideUp } from './animation';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  const [time, setTime] = useState('');

  // KSA Time
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0');
    const getKsaTimeString = () => {
      try {
        return new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Riyadh',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      } catch {
        const now = new Date();
        const h24 = (now.getUTCHours() + 3) % 24;
        const ampm = h24 >= 12 ? 'PM' : 'AM';
        const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
        return `${pad(h12)}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} ${ampm}`;
      }
    };
    setTime(getKsaTimeString());
    const id = setInterval(() => setTime(getKsaTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  // Slider animation
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (slider.current && firstText.current && secondText.current) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.5,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => (direction = e.direction * -1),
        },
        x: '-500px',
      });

      requestAnimationFrame(animate);
    }
  }, []);

  const animate = () => {
    if (xPercent < -100) xPercent = 0;
    else if (xPercent > 0) xPercent = -100;

    gsap.set(firstText.current, { xPercent });
    gsap.set(secondText.current, { xPercent });

    xPercent += 0.02 * direction;
    requestAnimationFrame(animate);
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
      id="home"
    >
      <Image
        src="/images/israrcover.jpg"
        alt="background"
        priority
        width={1300}
        height={1500}
        style={{ objectFit: 'cover', margin: '0 auto' }}
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Israr Benhamad — Israr Benhamad —</p>
          <p ref={secondText}>Israr Benhamad — Israr Benhamad —</p>
        </div>
      </div>

      <div className={styles.description}>
        <svg width="18" height="18" viewBox="0 0 9 9">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#f0f0f0" />
            </linearGradient>
          </defs>
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="url(#grad1)"
          />
        </svg>
        <p>Cinematic Art Decorator</p>
        <p>Creative Visionary & Storytelling Designer</p>
        <p>Based in KSA {time}</p>
      </div>
    </motion.main>
  );
}
