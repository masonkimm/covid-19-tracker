import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchInput from './SearchInput';
import numeral from 'numeral';

function Country({ countries }) {
  const [searchTerm, setSearchTerm] = useState('');

  //to save user input from search input
  const filterCountry = (e) => {
    e.preventDefault();
    const userInput = e.target.value.toLowerCase();

    setSearchTerm(userInput);
  };

  return (
    <div className="country">
      <SearchInput filterCountry={filterCountry} />

      {countries
        .filter((country) => {
          if (searchTerm === '') {
            return countries;
          } else {
            let countryName = country.country.toLowerCase();
            return countryName.includes(searchTerm);
          }
        })
        .map((country, index) => (
          <Card className="country__card" key={index} className="card">
            <CardContent className="country__cardContent">
              <div className="country__leftSide">
                <img src={country.countryInfo.flag} alt="country's flag" />
              </div>

              <div className="country__rightSide">
                <h2>{country.country}</h2>

                <Typography color="textSecondary" className="">
                  {country.continent}
                </Typography>

                <Typography color="textSecondary" className="">
                  Active Cases: {numeral(country.active).format('0,0')}
                </Typography>

                <Typography color="textSecondary" className="">
                  Total Cases: {numeral(country.cases).format('0,0')}
                </Typography>

                <Typography color="textSecondary" className="">
                  Total Recovered: {numeral(country.recovered).format('0,0')}
                </Typography>

                <Typography color="textSecondary" className="">
                  Total Deaths: {numeral(country.deaths).format('0,0')}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default Country;
