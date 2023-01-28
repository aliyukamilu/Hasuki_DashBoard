import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import { HOST, LocalHost } from "utils/constants";
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

function TableList() {
  // .........................

  // ....................

  const [allUsers, setdata] = useState([]);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`${LocalHost}/auth/getAllUsers`, {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrZXlzIiwibmFtZSI6IkpvaG4gTWFyayIsImlhdCI6Ikl5YW4gc2FmZSJ9.lIh4EQqj0B25Ptjx8R_5dAw2R8WoE-C87GkZF6KLkV8",
          },
        });
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
                <div className="flex flex-row  justify-end mt-[-40px]">
                  <EditModal
                    edit="Add New User"
                    title="Add New User to database"
                    name="User Moniker"
                    address="User Wallet"
                    solEarned="Solana"
                    BoopEarned="Hasuki"
                    XP="XP"
                    user="Add User"
                    color={true}
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
          {/* <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
                {/* <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
          {/* </Card.Body> */}
          {/* </Card> */}
          {/* </Col> */} */
        </Row>
      </Container>
    </>
  );
}

// import * as React from 'react';
// return (
//   <TablePagination
//     component="div"
//     count={100}
//     page={page}
//     onPageChange={handleChangePage}
//     rowsPerPage={rowsPerPage}
//     onRowsPerPageChange={handleChangeRowsPerPage}
//   />
// );

export default TableList;
