import {Button, Col, Row} from "react-bootstrap";

const ForecastInfo = ({info, saveForecastData}) => {

    return (
        <Row className='my-3'>
            <Col>
                {info && (
                    <div className="info-section p-4 border">
                        <h2>{info.city_name}</h2>
                        {info.list ? (
                            <>
                                <p className='fw-bold'>Period</p>
                                <p>Starts at: {moment(info.list[0].dt_txt).format('Y-MM-DD, hh:mm A')}</p>
                                <p>Ends
                                    at: {moment(info.list[info.list.length - 1].dt_txt).format('Y-MM-DD, hh:mm A')}</p>
                                <Button variant="success" onClick={() => saveForecastData()}>Save Forecast</Button>
                            </>
                        ) : (
                            <p>Updated at: {moment(info.info.updated_at).format('Y-MM-DD, hh:mm A')}</p>
                        )}
                    </div>
                )}
            </Col>
        </Row>
    )
};

export default ForecastInfo;
