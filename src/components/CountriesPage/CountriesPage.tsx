import React, {useState, useEffect} from 'react';
import {CountriesTable} from "./CountriesTable/CountriesTable";
import {Loader} from "../../core/Loader/Loader";
import {ErrorComponent} from "../../core/ErrorComponent/ErrorComponent";
import {apiCountries} from "../../api/apiCountries";
import {countriesRequestConfig} from "../../helper/countriesRequestConfig";

export function CountriesPage() {
    const [status, setStatus] = useState(0);
    const [countries, setCountries] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        apiCountries(countriesRequestConfig)
            .then((res) => res.json())
            .then((result) => {
                setStatus(1);
                setCountries(result.data.countries);
            })
            .catch(e => setIsError(true))
    }, [])

    const showContent = () => {
        return status ? <CountriesTable countries={countries}/> : <Loader/>
    }

    const checkError = () => {
        return isError ? ErrorComponent() : showContent()
    }

    return checkError()
}
