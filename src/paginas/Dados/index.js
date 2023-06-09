


import React from 'react';
import { Table } from 'antd';
import data from '../../componentes/data.json';

const ChartsPage = () => {
  const commonWords = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of','as','by', 'de','from', 'and', 'or','-',' ',';'];

  const processDataForZipfLaw = () => {
    const wordFrequencies = {};

    data.forEach(item => {
      const words = item.palavraChave.split(' ');

      words.forEach(word => {
        const cleanedWord = word.toLowerCase();

        if (!commonWords.includes(cleanedWord)) {
          if (wordFrequencies[cleanedWord]) {
            wordFrequencies[cleanedWord]++;
          } else {
            wordFrequencies[cleanedWord] = 1;
          }
        }
      });
    });

    const frequencies = Object.entries(wordFrequencies);
    frequencies.sort((a, b) => b[1] - a[1]);

    const chartData = frequencies.slice(0, 50).map((frequency, index) => ({
      word: frequency[0],
      frequency: frequency[1],
      key: index,
    }));

    return chartData;
  };

  const chartDataForZipfLaw = processDataForZipfLaw();

  const columns = [
    {
      title: 'Word',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
    },
  ];

  return (
    <div>
      <h2>Lei Bibliométrica de Zipf</h2>
      <Table columns={columns} dataSource={chartDataForZipfLaw} />
    </div>
  );
};

export default ChartsPage;



