import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import data from '../../componentes/data.json';

const ChartsPage = () => {
  const processDataByArea = () => {
    const areasCount = {};

    data.forEach(item => {
      const areas = item.areas.split(";");

      areas.forEach(area => {
        if (areasCount[area]) {
          areasCount[area]++;
        } else {
          areasCount[area] = 1;
        }
      });
    });

    const chartData = Object.entries(areasCount).map(([label, value]) => ({
      label,
      value
    }));

    return chartData;
  };

  const processDataByYear = () => {
    const yearsCount = {};

    data.forEach(item => {
      const year = item.ano ? item.ano.toString() : "";

      if (yearsCount[year]) {
        yearsCount[year]++;
      } else {
        yearsCount[year] = 1;
      }
    });

    const chartData = Object.entries(yearsCount).map(([label, value]) => ({
      label,
      value
    }));

    return chartData;
  };


  const processDataByLanguage = () => {
    const languagesCount = {};

    data.forEach(item => {
      const language = item.idioma;

      if (languagesCount[language]) {
        languagesCount[language]++;
      } else {
        languagesCount[language] = 1;
      }
    });

    const chartData = Object.entries(languagesCount).map(([label, value]) => ({
      label,
      value
    }));

    return chartData;
  };

  const chartDataByArea = processDataByArea();
  const chartDataByYear = processDataByYear();
  const chartDataByLanguage = processDataByLanguage();

   return (
    <div>
      <br />
      <h2>Métricas Informacionais</h2>
      <br />
      <br />
      <div>
        <h3>Quantidade de publicações por área</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartDataByArea}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FF6B6B" stroke="#FF6B6B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Quantidade de publicações por ano</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartDataByYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#FFCA3A" stroke="#FFCA3A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3>Quantidade de publicações por idioma</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartDataByLanguage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#67D8D8" stroke="#67D8D8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsPage;