export function RecordsTable({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.status}</td>
            <td><span onClick={() => row.open()}>Open</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
