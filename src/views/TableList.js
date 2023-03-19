import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import { HOST, LocalHost, configuration } from "utils/constants";
// import { Modal, Button, Label } from "flowbite-react";
// import TablePagination from "@mui/material/TablePagination";

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
} from "react-bootstrap";
import EditModal from "../components/EditModal";
import CreateNewUserModal from "components/Modals/CreateNewUserModal";

function TableList() {
  // .........................

  // ....................

  const [allUsers, setdata] = useState([]);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `${LocalHost}/auth/getAllUsers`,
          configuration
        );
        const No_users = res.data;
        const HasukiUsers = No_users.data;
        // console.log(No_users.data);
        setdata(HasukiUsers.reverse());
      } catch (err) {
        // console.log(err);
      }
    }

    getUser();
  }, []);

  // data.map((data) => {
  //   return console.log(data.name);
  // });

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title className="text-2xl ">Users Profile</Card.Title>

                <p className="card-category">
                  Total user on the list is {allUsers.length}
                </p>
                <div className="lg:flex flex-row  justify-end mt-[-50px] sm:block  mt-[30px]">
                  <CreateNewUserModal
                    edit="Add New User"
                    title="Add New User to database"
                    name="User Moniker"
                    address="User Wallet"
                    solEarned="Solana"
                    BoopEarned="Hasuki"
                    XP="XP"
                    user="Add User"
                    color={true}
                    // style={style}
                    // bath={true}
                  />
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Level</th>
                      <th className="border-0">SolEarned</th>
                      <th className="border-0">BoopEarned</th>
                      <th className="border-0">XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((data, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{data.name}</td>
                            {/* <td>{data.name}</td> */}
                            <td>{data.Level}</td>
                            <td>{data.solEarned}</td>
                            <td>{data.boopEarned}</td>
                            <td>{data.XP}</td>
                            <div className="flex flex-row">
                              <EditModal
                                edit="Edit"
                                title="Modify User Data"
                                name="User address"
                                address="User level"
                                solEarned="Solana"
                                BoopEarned="Hasuki"
                                XP="XP"
                                username={data.name}
                                alluserdata={allUsers}
                                user="Set User"
                              />
                              <DeleteModal
                                userAddress={data.address}
                                alluserdata={allUsers}
                              />
                            </div>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
