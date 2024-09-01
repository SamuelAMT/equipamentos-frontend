import React from 'react';
import EquipamentoFormStyle from '../styles/header.module.css';

const Header: React.FC = () => {
    return (
        <header className={EquipamentoFormStyle["app-header"]}>
            <div className={EquipamentoFormStyle["header-container"]}>
                <div className={EquipamentoFormStyle["logo-container"]}>
                    <img className={EquipamentoFormStyle["arkmeds-logo"]} src="/arkmeds_logo.png" alt="Arkmeds Logo" />
                </div>
                <div className={EquipamentoFormStyle["title-container"]}>
                    <h1 className={EquipamentoFormStyle["header-title"]}>Equipamentos Arkmeds</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
