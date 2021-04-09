import React, { useState, useEffect } from 'react';
import { RareImpact } from '../Components/Charts/RareImpact';
import { ObservableImpact } from '../Components/Charts/ObservableImpact';
import { SucceptiblePopulation } from '../Components/Charts/SucceptiblePopulation';
import { MapChart } from '../Components/Charts/MapChart';
import { PlotlyChart } from '../Components/Charts/PlotlyChart'

import styles from './homePage.module.css';

export const HomePage = () => {
    return (
        <section className={styles.homePage}>
            <div className={styles.options}>Options Bar</div>

            <div className={styles.mapContainer}>
                <MapChart></MapChart>
            </div>

            <div className={styles.chartsContainer}>
                <div className={styles.chart}>
                    <SucceptiblePopulation></SucceptiblePopulation>
                </div>
                <div className={styles.chart}>
                    <ObservableImpact></ObservableImpact>
                </div>
            </div>

            <div className={styles.table}>
                table
            </div>

        </section>
    )
}