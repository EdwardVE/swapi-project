const API_URL = 'https://swapi.dev/api';

async function getPlanets() {
  const response = await fetch(`${API_URL}/planets/`);
  const data = await response.json();
  return data.results;
}

async function getResidents(urls) {//llega un array de URLS
  const residentRequests = urls.map(url => fetch(url).then(res => res.json()));
  return await Promise.all(residentRequests);
}

async function getVehicles(urls) {//llega un array de URLS
  const vehicleRequests = urls.map(url => fetch(url).then(res => res.json()));
  return await Promise.all(vehicleRequests);
}

export { getPlanets, getResidents, getVehicles };
