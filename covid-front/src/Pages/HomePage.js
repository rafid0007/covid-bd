import React, { useState, useEffect, useContext } from 'react';
import { RareImpact } from '../Components/Charts/RareImpact';
import { ObservableImpact } from '../Components/Charts/ObservableImpact';
import { SucceptiblePopulation } from '../Components/Charts/SucceptiblePopulation';
import { MapChart } from '../Components/Charts/MapChart';
import { PlotlyChart } from '../Components/Charts/PlotlyChart'

import styles from './homePage.module.css';
import Table from '../Components/Design components/Table/Table';
import OptionBar from '../Components/Design components/OptionBar/OptionBar';
import { DistrictDataContext } from '../App';

export const HomePage = () => {
    const [districtData, setDistrictData] = useContext(DistrictDataContext)
    return (
        <section className={styles.homePage}>
            <div className={styles.options}>
                <OptionBar></OptionBar>
            </div>

            <div className={styles.mapContainer}>
                <MapChart></MapChart>
            </div>

            <div className={styles.chartsContainer}>
                <div className={styles.chart}>
                    {
                        districtData.NAME_3 ? <PlotlyChart></PlotlyChart> : <SucceptiblePopulation></SucceptiblePopulation>
                    }
                </div>
                <div className={styles.chart}>
                    {
                        districtData.NAME_3 ? <RareImpact></RareImpact> : <ObservableImpact></ObservableImpact>
                    }
                </div>
            </div>

            <div>
                <Table></Table>
            </div>

        </section>
    )
}