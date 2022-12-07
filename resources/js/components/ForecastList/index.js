import {Col, ListGroup, Row} from "react-bootstrap";
import ForecastListItem from "../ForecastListItem";

const ForecastList = ({dataAPI, dataDB}) => {

    return (
        <Row>
            <Col>
                <ListGroup>
                    <ListGroup.Item className='bg-light'>
                        <Row className='text-primary fw-bold'>
                            <Col md={3}>Datetime</Col>
                            <Col md={3}>Min Temp</Col>
                            <Col md={3}>Max Temp</Col>
                            <Col md={3}>Wind speed</Col>
                        </Row>
                    </ListGroup.Item>
                    {dataAPI && dataAPI.list.map((item, index) => (
                        <ForecastListItem
                            key={index}
                            dt={item.dt}
                            min_tmp={item.main.temp_min}
                            max_tmp={item.main.temp_max}
                            wind_spd={item.wind.speed}
                        />
                    ))}
                    {dataDB && <ForecastListItem
                        dt={dataDB.info.timestamp_dt}
                        min_tmp={dataDB.info.min_tmp}
                        max_tmp={dataDB.info.max_tmp}
                        wind_spd={dataDB.info.wind_spd}
                    />}
                </ListGroup>
            </Col>
        </Row>
    )
};

export default ForecastList;
