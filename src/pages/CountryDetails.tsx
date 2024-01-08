import React, { useState, useEffect } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { getCountryDetails } from '../Services';

export default function CountryDetails() {
    const { cca3 } = useParams();
    console.log("cca3:", cca3);

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const css = {
        background: 'black',
        color: '#9efff0'
    };
    const color = {
        color: '#9efff0'
    };
    const color2 = {
        color: '#d1fff8'
    };

    useEffect(() => {
        setLoading(true);
        console.log("cca3 22=== ", cca3);
        getCountryDetails(cca3)
            .then(result => {
                console.log("result", result, result.data[0]);
                if (result && result.data) {
                    setDetails(result.data);
                }
            })
            .catch(error => {
                console.error("Error fetching country details:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cca3]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }
    const navigateToHome = () => {
        window.location.href = '/';
    }

    return (
        <div>
            {details && details.map((details) => (
                <IonCard key={details?.name?.common} style={css}>
                    {details?.flags?.png && <img src={details?.flags?.png} alt={details?.name?.common} />}
                    <IonCardHeader>
                        <IonCardTitle style={color}>{details?.name?.common || 'Country Name'}</IonCardTitle>
                        <IonCardSubtitle style={color2}>Capital: {details?.capital}</IonCardSubtitle>
                        {/* <IonCardSubtitle style={color2}>Currencies: {details?.currencies.map(currency => currency.name).join(',')}</IonCardSubtitle> */}
                        <IonCardSubtitle style={color2}>Population: {details?.population}</IonCardSubtitle>
                        <IonCardSubtitle style={color2}>Area: {details?.area} sq. km</IonCardSubtitle>
                        <IonCardSubtitle style={color2}>Map: {details?.maps.googleMaps}</IonCardSubtitle>
                        <IonCardSubtitle style={color2}>Region: {details?.region}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonButton onClick={navigateToHome}>Back</IonButton>
                </IonCard>
            ))}
        </div>
    );
}
