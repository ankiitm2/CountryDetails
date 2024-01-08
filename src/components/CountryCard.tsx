import { IonText, IonIcon, IonRow, IonCol } from '@ionic/react';

export default function CountryCard(props) {

    const css = `.flag-img{width:auto; height:200px}`

    return (
        <>
            <style>{css}</style>
            <img className='flag-img' src={props.flagUrl} alt={props.name} />
            <h1>{props.name}</h1>
            <IonRow class="ion-align-items-center">
                <IonCol size='auto'><h4>{props.capital}</h4></IonCol><IonCol size="auto"><h2>|</h2></IonCol>  <IonCol><h4>{props.population}</h4></IonCol>
            </IonRow>
        </>
    )
}