import {Col, ListGroup, Row} from "react-bootstrap";

const ForecastListItem = ({dt, min_tmp, max_tmp, wind_spd}) => {
    return (
        <ListGroup.Item className='bg-light'>
            <Row>
                <Col md={3}>{moment.unix(dt).format('Y-MM-DD, hh:mm A')}</Col>
                <Col md={3}>{min_tmp}&#8451;</Col>
                <Col md={3}>{max_tmp}&#8451;</Col>
                <Col md={3}>{wind_spd} km/h</Col>
            </Row>
        </ListGroup.Item>
    )
};

export default ForecastListItem;
