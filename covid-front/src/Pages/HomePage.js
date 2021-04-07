import React, {useState, useEffect} from 'react';
import { RareImpact } from '../Components/Charts/RareImpact';
import { ObservableImpact } from '../Components/Charts/ObservableImpact';
import { SucceptiblePopulation } from '../Components/Charts/SucceptiblePopulation';
import { MapChart } from '../Components/Charts/MapChart';
import { PlotlyChart } from '../Components/Charts/PlotlyChart' 

export const HomePage = () => {
    return (
        <>
        <section class="section">
            <div class="container">
                <h1 class="title">
                    COVID-19 in Bangladesh
                </h1>
                <RareImpact/>
                <ObservableImpact/>
                <SucceptiblePopulation/>
                <PlotlyChart/>
                <MapChart/>
            </div>
        </section>
        </>
    )
}