import React from 'react';
import { Link, useLocation} from 'react-router-dom';

import SearchBar from '../searchBar/searchBar';

import styles from './topBar.module.css';

const TopBar = () => {

    const location = useLocation();

    return (
        <div className={styles.topBar}>
            <Link to='/'><div className={styles.brand}>Covid 19 in Bangladesh</div></Link>
            <div className={styles.grow} />
            {
                location.pathname !== '/about'? <SearchBar />: null
            }
            <div className={styles.grow} />
            <ul className={styles.cats}>
                <li className={styles.catItem}><Link to='/home'>Home</Link></li>
                <li className={styles.catItem}><Link to='/about'>About Us</Link></li>
            </ul>
        </div>
    )
};

export default TopBar;