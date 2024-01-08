import React, { useEffect, useState } from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonButton, IonNavLink } from '@ionic/react';
import CountryCard from '../components/CountryCard';
import { getAllCountries } from '../Services/index';
import { Link } from 'react-router-dom';
import { IonInput, IonSelect, IonSelectOption } from '@ionic/react';


function Home() {
    const [countryList, setCountryList] = useState([]);
    const [filteredCountryList, setFilteredCountryList] = useState([]);
    const [region, setRegion] = useState('')
    const [countryName, setCountryName] = useState('')

    const handleRegion = (event) => {
        console.log("event.target.value === ", event, event.target.value);

        setRegion(event.target.value);
        console.log("region === ", region);
    }
    const handleCountryName = (event) => {
        setCountryName(event.target.value);
        console.log("event.target.value === ", event.target.value);
        console.log(countryName);
    }

    const overflowhidden = {
        overflow: 'auto',
        height: '100vh',
        padding: '0 0 7rem 0'
    }
    const input = {
        width: 'fit-content',
        margin: '1rem 1rem 0 1rem',
    }
    const search = {
        width: '11%',
        margin: '1rem 1rem 0 1rem',
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllCountries();
                const countries = result.data;
                setCountryList(countries);
                setFilteredCountryList(countries);

            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("changes:", region, countryName);
        if (region === '' && countryName === '') {
            setFilteredCountryList(countryList);
        } else {
            let filteredCountries = countryList;
            if (region.length) {
                filteredCountries = countryList.filter(country => {
                    if (country.region.toLowerCase() === region.toLowerCase()) return true;
                    return false;
                })
            } if (countryName.length) {
                filteredCountries = filteredCountries.filter(country => {
                    const lowerCaseName = (country.name.common || '').toLowerCase();
                    return lowerCaseName.includes(countryName.toLowerCase());
                })
            }
            setFilteredCountryList(filteredCountries);
        }
    }, [region, countryList, countryName])

    return (
        <>
            <IonRow>
                <IonInput onIonInput={handleCountryName} value={countryName} label="Search by name" style={input} labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
                <IonSelect onIonChange={handleRegion} label="Search by continent" style={search} value={region} labelPlacement="floating" fill="solid">
                    <IonSelectOption value="Asia">Asia</IonSelectOption>
                    <IonSelectOption value="Africa">Africa</IonSelectOption>
                    <IonSelectOption value="Americas">Americas</IonSelectOption>
                    <IonSelectOption value="Europe">Europe</IonSelectOption>
                    <IonSelectOption value="Oceania">Oceania</IonSelectOption>
                </IonSelect>
            </IonRow>
            <IonRow style={overflowhidden}>
                {filteredCountryList.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country) => (
                    <IonCol size='3' key={`${country.cca3}_${country.name.common}`}>

                        <IonCard>
                            <IonCardHeader>
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/countries/${country.cca3}`}>
                                    <CountryCard
                                        name={country.name.common}
                                        capital={country.capital}
                                        population={country.population}
                                        flagUrl={country.flags.svg}
                                    />
                                </Link>

                            </IonCardHeader>

                        </IonCard>
                    </IonCol>
                ))}
            </IonRow>
        </>
    );
};
export default Home;
