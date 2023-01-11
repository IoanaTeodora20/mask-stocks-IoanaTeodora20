import Table from "react-bootstrap/Table";
function HospitalTable({ list }) {
  let listHos = Array.from(list);
  return (
    <div id="table">
      <Table responsive="sm" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {listHos.map((hospital, index) => (
            <tr key={hospital.name}>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.city}</td>
              <td>{hospital.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HospitalTable;
