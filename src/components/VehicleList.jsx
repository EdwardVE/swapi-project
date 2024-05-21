import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlanets, getResidents, getVehicles } from '../services/swapi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const VehicleList = () => {
  const { residentName } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [resident, setResident] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchVehicles() {
      const planets = await getPlanets();
      const residentsURLs = planets.flatMap(planet => planet.residents);
      const residentDetails = await getResidents(residentsURLs);
      const currentResident = residentDetails.find(resident => resident.name === residentName);
      setResident(currentResident);
      const data = await getVehicles(currentResident.vehicles);
      setVehicles(data);
    }
    fetchVehicles();
  }, [residentName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Vehicle List for {residentName}</h1>
      <Link to="/planets">
        <button>Planets</button>
      </Link>
      <input
        type="text"
        placeholder="Search vehicles..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Passengers</TableCell>
              <TableCell>Cost in Credits</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Max Atmosphering Speed</TableCell>
              <TableCell>Crew</TableCell>
              <TableCell>Cargo Capacity</TableCell>
              <TableCell>Consumables</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map(vehicle => (
              <TableRow key={vehicle.name}>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.manufacturer}</TableCell>
                <TableCell>{vehicle.vehicle_class}</TableCell>
                <TableCell>{vehicle.passengers}</TableCell>
                <TableCell>{vehicle.cost_in_credits}</TableCell>
                <TableCell>{vehicle.length}</TableCell>
                <TableCell>{vehicle.max_atmosphering_speed}</TableCell>
                <TableCell>{vehicle.crew}</TableCell>
                <TableCell>{vehicle.cargo_capacity}</TableCell>
                <TableCell>{vehicle.consumables}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VehicleList;
