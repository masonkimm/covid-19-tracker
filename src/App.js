import logo from './logo.svg';
import './App.css';
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import Country from './components/Country';
import numeral from 'numeral';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //function to sort the chart from highest # of cases to lowest.
  const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
  };

  const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format('0.0a')}` : '+0';

  //to call on 'Worldwide' data on load
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //to call on all countries and display individual info
  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States of America
            value: country.countryInfo.iso2, //US, UK
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountryData();
  }, []);

  //to display selected country from dropdown menu
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <h1>Today's New Cases: {country}</h1>
          <div className="app__infoBoxes">
            <InfoBox
              title="Covid-19 Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
            />
            <InfoBox
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
            />
            <InfoBox
              isRed
              title="Death"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
            />
          </div>
        </div>

        <div className="app__countryStats">
          <Country countries={tableData} />
        </div>
      </div>

      <Card className="app_right">
        <CardContent>
          <h2>Total Cases by Country</h2>
          <Table countries={tableData} />
        </CardContent>
      </Card>

      <div className="app__logo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </div>
  );
}

export default App;
