import React from "react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { configuration, HOST, LocalHost } from "utils/constants";
// import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from "axios";
import { lowerFirst } from "lodash";
function Dashboard() {
  const [user, setuser] = useState("");
  const [hunt, sethunt] = useState(null);
  // const [huntClaimed, sethuntClaimed] = useState([]);
  const [first, setfirst] = useState("");

  // function for UserApi

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${HOST}/auth/getAllUsers`, configuration);
        const No_users = res.data;
        const HasukiUsers = No_users.data.length;
        // console.log(No_users.data.length);
        setuser(HasukiUsers);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, []);

  // function for tweet Claimed

  useEffect(() => {
    TotalHunt();
  }, []);

  async function TotalHunt() {
    const resp = await axios.get(
      `${HOST}/auth/retrieveHuntsAll`,
      configuration
    );
    const huntsDD = resp.data;
    // console.log(hunts);
    sethunt(huntsDD);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center">
                      <Icon
                        icon="mdi:users-group"
                        style={{ fontSize: "8vh" }}
                      />
                      {/* <i className="nc-icon nc-chart text-warning"></i> */}
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Active Users</p>
                      <Card.Title as="h4">{user}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  {/* Update Now */}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Hunts</p>
                      <Card.Title as="h4">{hunt && hunt.totalHunts}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="far fa-calendar-alt mr-1"></i> */}
                  {/* Last day */}
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Claims</p>
                      <Card.Title as="h4">
                        {hunt && hunt.totalClaims}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="far fa-clock-o mr-1"></i> */}
                  {/* In the last hour */}
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Sol Disbursed</p>
                      <p className="font-bold text-xl">
                        {hunt && hunt.solDistributed.toFixed(2)}{" "}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  {/* Refresh */}
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">BOOP Disbursed</p>
                      <p className="font-bold text-xl">
                        {hunt && hunt.boopDistributed}{" "}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  {/* Refresh */}
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
