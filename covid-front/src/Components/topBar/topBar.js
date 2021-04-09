import React from 'react';
import styles from './topBar.module.css';

const TopBar = () => {
    return(
        <div className={styles.topBar}>
            <div className={styles.brand}>Covid 19 in Bangladesh</div>
            <div className={styles.grow}/>
            <ul className={styles.cats}>
                <li className={styles.catItem}>Home</li>
                <li className={styles.catItem}>Regional Stats</li>
                <li className={styles.catItem}>About</li>
            </ul>
        </div>
    )
};

export default TopBar;