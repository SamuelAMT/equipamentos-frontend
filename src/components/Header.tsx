import React from 'react';
import styles from '../styles/equipamentos_form.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles["app-header"]}>
            <div className={styles["header-container"]}>
                <div className={styles["logo-container"]}>
                    <img className={styles["arkmeds-logo"]} src="/arkmeds_logo.png" alt="Arkmeds Logo" />
                </div>
                <div className={styles["title-container"]}>
                    <h1 className={styles["header-title"]}>Equipamentos Arkmeds</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
