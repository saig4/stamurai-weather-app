import React, { useEffect, useState } from 'react';

const YourComponent = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100');
        const data = await response.json();
        setCitiesData(data.results);
        setFilteredCities(data.results);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter cities based on search query
    const filtered = citiesData.filter(city =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchQuery, citiesData]);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Cities Data</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{ boxShadow: "5px 5px 10px DarkGray", borderRadius: "5px", height: "20px" }}
        />
      </div>
      <br />
      <label style={{ display: "flex", justifyContent: "center", fontSize: "20px", fontWeight: "bold" }}>Click on the city for more information</label>
      <br />
      {isLoading ? (
        <div style={{display: "flex", justifyContent: "center"}}><h1>Loading...</h1></div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: "red", color: "white" }}>CityName</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: "red", color: "white" }}>Country</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: "red", color: "white" }}>TimeZone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map(city => (
                <tr key={city.geoname_id}>
                  <td style={{ border: '1px solid black', padding: '8px', backgroundColor: "lavender" }}>
                    <a
                      href={`https://openweathermap.org/city/${city.geoname_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {city.name}
                    </a>
                  </td>
                  <td style={{ border: '1px solid black', padding: '8px', backgroundColor: "lavender" }}>{city.cou_name_en}</td>
                  <td style={{ border: '1px solid black', padding: '8px', backgroundColor: "lavender" }}>{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
