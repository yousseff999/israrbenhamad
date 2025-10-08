import styles from './style.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../../../common/RoundedButton';
import Magnetic from '../../../../common/Magnetic';
import { usePathname } from 'next/navigation';

export default function index() {
  return (
    <>
    <div className={styles.footer}>
      <Magnetic>
        <div className={styles.el}>
        <a href='https://www.instagram.com/israr_bh' target='_blank'>Instagram</a>
        <div className={styles.indicator}></div>
        </div>
      </Magnetic>
      <Magnetic>
        <a href="/resume.pdf" download>Resume</a>
      </Magnetic>
    </div>
    </>
  )
}
