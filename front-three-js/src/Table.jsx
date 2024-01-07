

const Table = () => {
  const data = [
    { type: 'Notebook', brand: 'Dell', price: '$800' },
    { type: 'Notebook', brand: 'HP', price: '$700' },
    { type: 'Newspaper', title: 'Breaking News', date: '2024-01-06' },
  ];

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
