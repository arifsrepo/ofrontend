import { faFolderOpen, faGears, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import useActiveSession from '../../hooks/useActiveSession';
import useApiManager from '../../hooks/useApiManager';
import PieChart from '../PieChart/PieChart';
import SiteNavBar from '../SiteNavBar/SiteNavBar';
import './AdminControl.css';
import Spinner from 'react-bootstrap/Spinner';

const AdminControl = () => { 
    const [db1status, setDb1status] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [adminerror, setAdminerror] = useState('');
    const { location } = useActiveSession();
    const { api, setApi, apiManager } = useApiManager();
    const [dsbtn, setDsbtn] = useState(false);
    const [activedb, setActivedb] = useState(null);
    const [dbname, setDbname] = useState(false);

    useEffect(() => {
        const payload = {"dbn": activedb};
        if(activedb){
            fetch(`${api}/memory`, {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(res => setDb1status(res))
            .catch((err) => {
                setAdminerror({err});
                setApi(apiManager(api));
            });
        }
    },[dbname, dsbtn, activedb])

    useEffect(() => {
        fetch(`${api}/session`)
        .then(res => res.json())
        .then(res => setTabledata(res))
        .catch((err) => {
            setAdminerror({err});
            setApi(apiManager(api));
        });
    },[location])


    const dbSelect = db => {
        setDsbtn(true);
        fetch(`${api}/dbs`,{
            method: 'PUT', // Use the PUT method
            headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({"selected":db}),
        })
        .then(res => res.json())
        .then(res => { 
            setDsbtn(false);
            setDbname(res?.acknowledged)
        })
        .catch((err) => setDsbtn(false));
    }

    useEffect(() => {
      fetch(`${api}/dbs`)
      .then(response => response.json())
      .then(result => {
        setActivedb(result[0].selected);
      })
      .catch(err => {
        console.log({err});
      });
    },[dsbtn, dbname])  

    return (
        <div>
            <div className="banner" />
            <SiteNavBar />
                <Container>
                    {
                        adminerror&&adminerror
                    }  
                  <br />
                    <Dropdown>
                      <Dropdown.Toggle disabled={dsbtn} variant="success" id="dropdown-basic">{activedb=='1'?"Database 1":"Database 2"}</Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>dbSelect(1)}>Database 1</Dropdown.Item>
                        <Dropdown.Item onClick={()=>dbSelect(2)}>Database 2</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <Row className="admin_control_container">
                        <Col className="chart_holder" xs={12} sm={12} md={6}>
                            {
                                db1status?.availSpace?<PieChart db1status={db1status} />:<Spinner className="spiner_style2" animation="border" variant="danger" />
                            }    
                        </Col>
                        <Col className="chart_holder" xs={12} sm={12} md={6}>
                            <div className="db_report_main">
                                <br />
                                <h2><b>Database Report</b></h2>
                                    <br />
                                    <br />
                                    <table className="db_report_text">
                                        <tr>
                                            <th><FontAwesomeIcon icon={faFolderOpen} style={{color: "#024796",}} className="db_report_icon" /></th>
                                            <th>Total Space : 512.00 MB</th> 
                                        </tr>
                                        <br />
                                        <tr>
                                            <th><FontAwesomeIcon icon={faPaperPlane} style={{color: "#0f8978",}} className="db_report_icon" /></th>
                                            <th>Free Space : {(512-(db1status?.totalSpace-db1status?.availSpace)).toFixed(2)} MB</th>
                                        </tr>
                                        <br />
                                        <tr>
                                            <th><FontAwesomeIcon icon={faGears} style={{color: "#f05e33",}} className="db_report_icon" /></th>
                                            <th>Used Space : {(db1status?.totalSpace-db1status?.availSpace).toFixed(2)} MB</th>
                                        </tr>
                                    </table>
                                <br />
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <h2><b>User Session</b></h2>
                        <br />
                        <br />
                        <div className="table">
                            <div className="table_row">
                                <div className="table_data">IP Address</div>
                                <div className="table_data">Email</div>
                                <div className="table_data">Date</div>
                                <div className="table_data">Visited</div>
                            </div>
                            {
                                tabledata.map(data =>
                                    <div className="table_row">
                                    <div className="table_data">{data?.ipAddress}</div>
                                        <div className="table_data">{data?.Email}</div>
                                        <div className="table_data">{data?.Date + ", Time : " + data?.Time}</div>
                                        <div className="table_data">{data?.Visited}</div>
                                    </div>)
                            }
                        </div>
                    </Row>
                </Container>
            <br />
        </div>
    );
};

export default AdminControl;