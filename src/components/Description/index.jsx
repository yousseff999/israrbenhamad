import styles from './styles.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, slideIn } from './animation';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const phrase = `Designing Worlds, One Story at a Time.`;
    const description = useRef(null);
    const isInView = useInView(description);

    return (
        <div ref={description} className={styles.description} id='about'>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map((word, index) => (
                        <span key={index} className={styles.mask}>
                            <motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"}>{word}</motion.span>
                        </span>
                    ))
                }
                </p>
                <motion.p variants={slideIn} animate={isInView ? "open" : "closed"}>
I am a Set Decorator and Art Director with a decade of experience shaping the visual identity of films and series. My craft lies in creating authentic environments that enrich storytelling, blending artistic vision with meticulous detail to transform imagination into reality.                
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Magnetic>
                    <div className={styles.button}>
                        About me
                    </div>
                    </Magnetic>
                </div>
            </div>
        </div>
    )
}
