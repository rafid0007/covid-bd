import React, { useEffect, useState } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData([])
  }, [])
  return (
    <div>
      <table style={{ width: '100%' }}>
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