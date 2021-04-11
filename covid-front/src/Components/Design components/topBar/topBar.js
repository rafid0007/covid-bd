import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../searchBar/searchBar';

import styles from './topBar.module.css';

const TopBar = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.brand}>Covid 19 in Bangladesh</div>
            <div className={styles.grow} />
            <SearchBar />
            <div className={styles.grow} />
            <ul className={styles.cats}>
                <li className={styles.catItem}><Link to='/home'>Home</Link></li>
                <li className={styles.catItem}><Link to='/about'>About Us</Link></li>
            </ul>
        </div>
    )
};

export default TopBar;