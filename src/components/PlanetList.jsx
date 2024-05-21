import { useState, useEffect } from 'react';
import { getPlanets } from '../services/swapi';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PlanetList = () => {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPlanets() {
      const data = await getPlanets();
      setPlanets(data);
    }
    fetchPlanets();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlanets = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Welcome Swapi</h1>
      <Link to="/planets">
        <button>Planets</button>
      </Link>
      <input
        type="text"
        placeholder="Search planets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button>ok</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Planet Name</TableCell>
              <TableCell>View Residents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlanets.map(planet => (
              <TableRow key={planet.name}>
                <TableCell component="th" scope="row">
                  {planet.name}
                </TableCell>
                <TableCell>
                  <Link to={`/residents/${planet.name}`}>View Residents</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PlanetList;
