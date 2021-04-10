import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div>
                <p>Powered by: SUST</p>
                <p>Copyright &copy; 2021</p>
            </div>
        </div>
    )
}

export default Footer