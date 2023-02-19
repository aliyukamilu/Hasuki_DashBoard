import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { configuration, HOST, LocalHost } from "../utils/constants";
import { CiBitcoin } from "react-icons/ci";
import EditModal from "components/EditModal";
import { AiOutlineFileDone } from 'react-icons/ai'
import { GiJumpingDog } from 'react-icons/gi'
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Spinner, Tabs } from "flowbite-react";

function Icons() {
  const [hunts, sethunts] = useState(null);
  const [HuntInfo, setHuntInfo] = useState(null);
  const [loadingg, setloadingg] = useState(false)
  const [ExpiredData, setExpiredData] = useState(null)

  useEffect(() => {
    huntsNo();
  }, []);

  async function huntsNo() {
    try {
      setloadingg(true)
      const res = await axios.get(
        `${LocalHost}/auth/retriveHunts`,
        configuration
      );

      const RetrivedHunts = res.data.data;

      sethunts(RetrivedHunts.reverse().filter(iii => iii.isExpired === false));
      setExpiredData(RetrivedHunts.reverse().filter(ii => ii.isExpired === true))

      setloadingg(false)
      // console.log(response2.data.data);
      const response2 = await axios.get(
        `${LocalHost}/auth/retrieveHuntsInfo`,
        configuration
      );
      setHuntInfo(response2.data.data);

    } catch (error) {
      console.log(error)
      setloadingg(false)
      alert("something went wrong !")
    }


  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header className="">
                <Card.Title as="h4">Hasuki Hunts</Card.Title>
                {/* <div className=" flex flex-row "> */}
                <p className="card-category">
                  Total hunts ({hunts && hunts.length})
                  {/* <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a> */}
                </p>
                <div className=" lg:flex flex-row justify-end mt-[-50px] sm:block  mt-[30px]">
                  <EditModal
                    edit="Create New Hunt"
                    title="Create New Hunt"
                    // body of modal
                    name="Tweet URL"
                    id="Tweet ID"
                    hunt="Hunt Title"
                    huntdes="Hunt Description"
                    huntimg="Hunt Image"
                    tweetcontent="Tweet Content"
                    XP="XP Reward"
                    token="Token reward"
                    // Reward = "Reward Type"
                    Claimable="Claimable"
                    // BoopEarned="Hasuki"
                    // XP="XP"
                    user="create hunt"
                    bath={true}
                  // style={{ height: "600px", overflow: "auto" }}
                  // click={handleCreate}
                  // style={{ backgroundColor: "#198754" }}
                  />
                </div>
                {/* </div> */}
              </Card.Header>
              <Card.Body className="all-icons">
                <Row></Row>
              </Card.Body>
              {loadingg ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <Tabs.Group aria-label="Tabs with icons" className='mt-5' style="underline" id="tabsss">

                    <Tabs.Item active={true} title={`Live Hunts (${hunts && hunts.length})`} icon={GiJumpingDog}>
                      {hunts && (
                        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-8 px-3">
                          {hunts.map((huntsdata, i) => (
                            <HuntsCard
                              key={i}
                              huntInfo={huntsdata}
                              claimsInfo={HuntInfo && HuntInfo.filter(
                                (cc) => cc.tweet_id === huntsdata.tweet_id
                              )}
                            />
                          ))}
                        </section>
                      )}
                    </Tabs.Item>

                    <Tabs.Item title={`Past Hunts (${ExpiredData && ExpiredData.length})`} icon={AiOutlineFileDone}>
                      {ExpiredData && (
                        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-8 px-3">
                          {ExpiredData.map((huntsdata, i) => (
                            <HuntsCard
                              key={i}
                              huntInfo={huntsdata}
                              claimsInfo={HuntInfo && HuntInfo.filter(
                                (cc) => cc.tweet_id === huntsdata.tweet_id
                              )}
                            />
                          ))}
                        </section>
                      )}
                    </Tabs.Item>
                  </Tabs.Group>


                </>
              )}

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Icons;

const HuntsCard = ({ huntInfo, claimsInfo }) => {
  return (
    // <>
    <div
      className="huntsCard w-full cursor-pointer rounded-xl"
      data-reward={huntInfo.reward_type}
    >
      <div className="w-full h-[120px] max-h-[120px] overflow-hidden rounded-t-xl">
        <img
          src={huntInfo.hunt_image}
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <div className="p-4">
        <p className="title text-lg fontBold text-[#fa6002]">
          {huntInfo.hunt_title}
        </p>
        <div className="infoWrapper h-[80px]">
          <p className="text-sm huntInfo text-[#ebe6e6]">
            {huntInfo.hunt_description}
          </p>
        </div>

        <div className="flex justify-between">
          {huntInfo.isExpired ? (
            <div>
              <p className="text-white mb-3">{claimsInfo && claimsInfo[0].claimers.length} claimed</p>
              <button className='bg-[#BCF0DA] px-2 rounded-lg text-[#0C4737] claimedButton'>
                Ended 🕓
              </button>
            </div>
          ) : (
            <div>
              <p className="fontBold text-white">Claims</p>
              <p className="fontBold text-sm textPrimary">
                {claimsInfo[0].claimers.length}
                <span className="text-white"> / </span>
                {huntInfo.claimable}
              </p>
              <button className='bg-[red] px-2 rounded-lg text-[#0C4737] claimedButton'>
                Live 🕓
              </button>
            </div>
          )
          }

          <div>
            <p className="fontBold text-white">Reward</p>
            {huntInfo.reward_type === "boop" ? (
              <div className="flex items-center gap-1">
                <CiBitcoin className="text-[#fa6002] text-lg" size={20} />
                <p className="font-bold textPrimary text-sm">
                  {huntInfo.token_reward} $BOOP
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <img
                  src={require(`../assets/img/${huntInfo.reward_type}.png`)}
                  className="h-[25px] w-[30px]"
                  alt=""
                />
                <p className="font-bold uppercase textPrimary text-sm">
                  {huntInfo.token_reward} ${huntInfo.reward_type}
                </p>
              </div>
            )}
          </div>
        </div>
      </div >
    </div >
    // </>
  );
};
