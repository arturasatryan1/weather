import {useEffect, useState} from "react";
import {Button, Form, Row, Col, Container, ListGroup} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {fetchForecastFromAPI, fetchForecastFromDB, saveForecast} from "../../redux/slices/forecastSlice";
import ForecastInfo from "../../components/ForecastInfo";
import ForecastList from "../../components/ForecastList";

function MainPage() {
    const [city, setCity] = useState('');
    const [forecastDataInfoAPI, setForecastDataInfoAPI] = useState(null);
    const [forecastDataInfoDB, setForecastDataInfoDB] = useState(null);
    const dispatch = useDispatch();
    const forecastDataAPI = useSelector(({forecast}) => forecast.forecastDataFromAPI);
    const forecastDataDB = useSelector(({forecast}) => forecast.forecastDataFromDB);
    const forecastDataErrorMessage = useSelector(({forecast}) => forecast.errorMessage);

    const getForecastAPIData = async () => {
        dispatch(fetchForecastFromAPI({city}));
    };

    const getForecastDBData = async () => {
        dispatch(fetchForecastFromDB({city}));
    };

    const saveForecastData = async () => {
        let data = {...forecastDataInfoAPI};
        data.list = forecastDataInfoAPI.list[0];
        dispatch(saveForecast({data}));
    };

    useEffect(() => {
        if (forecastDataErrorMessage) {
            setForecastDataInfoAPI(null);
            setForecastDataInfoDB(null);
        }
    }, [forecastDataErrorMessage]);

    useEffect(() => {
        if (forecastDataAPI) {
            setForecastDataInfoAPI(forecastDataAPI);
            setForecastDataInfoDB(null);
        }
    }, [forecastDataAPI]);

    useEffect(() => {
        if (forecastDataDB) {
            setForecastDataInfoDB(forecastDataDB);
            setForecastDataInfoAPI(null);
        }
    }, [forecastDataDB]);

    return (
        <Container>
            <Row className='pt-3'>
                <Col>
                    <h2 className='text-center'>
                        <span className='text-primary'>Jacket</span> or no <span className='text-primary'>Jacket</span>
                    </h2>
                </Col>
            </Row>
            <Row className='pt-3 border-bottom'>
                <Col md={6}>
                    <Form.Control
                        className='mb-3'
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={'Enter city name here (E.g New York)'}
                    />
                </Col>
                <Col md={3}>
                    <Button onClick={() => getForecastAPIData()} className='w-100' variant="primary" disabled={!city}>Get
                        from
                        API</Button>
                </Col>
                <Col md={3}>
                    <Button onClick={() => getForecastDBData()} className='w-100' variant="warning" disabled={!city}>Get
                        from DB</Button>
                </Col>
            </Row>

            {(forecastDataInfoAPI || forecastDataInfoDB) && (
                <ForecastInfo
                    info={forecastDataInfoAPI || forecastDataInfoDB}
                    saveForecastData={saveForecastData}
                />
            )}

            {
                forecastDataErrorMessage && (
                    <Row className='pt-3'>
                        <Col>
                            <h3 className='text-center'>{forecastDataErrorMessage}</h3>
                        </Col>
                    </Row>
                )
            }

            {(forecastDataInfoAPI || forecastDataInfoDB) && (
                <ForecastList
                    dataAPI={forecastDataInfoAPI}
                    dataDB={forecastDataInfoDB}
                />
            )}
        </Container>
    );
}

export default MainPage;
