import React, { useEffect, useState } from 'react';
import './Table.css'

const Table = () => {
  const [tableData, setTableData] = useState([{ date: '12/1/21', confirmedCases: 38, recoveredCases: 12, deaths: 0, Rt: 2, DT: 1.9 }])

  // useEffect(() => {
  //   setTableData([])
  // }, [])
  return (
    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Confirmed Cases</th>
            <th>Recoverd Cases</th>
            <th>Deaths</th>
            <th>Rt</th>
            <th>DT</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map(rowData => (
              <tr>
                <td>{rowData.date}</td>
                <td>{rowData.confirmedCases}</td>
                <td>{rowData.recoveredCases}</td>
                <td>{rowData.deaths}</td>
                <td>{rowData.Rt}</td>
                <td>{rowData.DT}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;