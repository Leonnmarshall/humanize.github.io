import { Scatter } from 'react-chartjs-2';
import data from './data.json';
import React from 'react';

const processDataForBradfordLaw = () => {
    const periodicoCount = {};

    data.forEach(item => {
        const periodico = item.periodico;

        if (periodicoCount.hasOwnProperty(periodico)) {
            periodicoCount[periodico]++;
        } else {
            periodicoCount[periodico] = 1;
        }
    });

    const periodicoArray = Object.entries(periodicoCount);
    periodicoArray.sort((a, b) => b[1] - a[1]);

    const periodicosOrdenados = periodicoArray.map(pair => pair[0]);

    const fator = 2;
    const frequenciasCumulativas = periodicosOrdenados.map((periodico, index) => fator * (index + 1));

    const chartData = periodicoArray.map((pair, index) => ({
        x: index + 1,
        y: pair[1]
    }));

    return {
        labels: periodicosOrdenados,
        datasets: [
            {
                label: 'Lei de Bradford',
                data: chartData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                pointRadius: 6
            }
        ]
    };
};

const EstudosMetricos = () => {
    const data = processDataForBradfordLaw();

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Periódico (Ordenado)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Frequência'
                }
            }
        }
    };

    return (
        <div>
            <h3>Lei de Bradford</h3>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default EstudosMetricos;
