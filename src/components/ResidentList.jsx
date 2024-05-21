import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlanets, getResidents } from '../services/swapi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResidentList = () => {
  const { planetName } = useParams();
  const [residents, setResidents] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchResidents() {
      const planets = await getPlanets();
      const currentPlanet = planets.find(planet => planet.name === planetName);
      setPlanet(currentPlanet);
      const data = await getResidents(currentPlanet.residents);
      setResidents(data);
    }
    fetchResidents();
  }, [planetName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Residents List for {planetName}</h1>
      <Link to="/planets">
        <button>Planets</button>
      </Link>
      <input
        type="text"
        placeholder="Search residents..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button>ok</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Resident Name</TableCell>
              <TableCell>View Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResidents.map(resident => (
              <TableRow key={resident.name}>
                <TableCell component="th" scope="row">
                  {resident.name}
                </TableCell>
                <TableCell>
                  <Link to={`/vehicles/${resident.name}`}>View Vehicles</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResidentList;
