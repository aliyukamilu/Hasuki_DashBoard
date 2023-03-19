import React from "react";
import { useEffect, useState } from "react";
import { configuration, HOST, LocalHost } from "utils/constants";
import axios from "axios";
import { Badge, Button, Modal, Spinner } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Approvehunts() {
  const [HuntData, setHuntData] = useState(null)
  const [loadingg, setloadingg] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [theHuntid, setHuntId] = useState(0)
  const [approving, setApproving] = useState(false)

  useEffect(() => {
    async function fetchHunts() {
      try {
        setloadingg(true)
        const res = await axios.get(
          `${LocalHost}/auth/retrieveHuntsNot`,
          configuration
        );

        const RetrivedHunts = res.data.data;

        setHuntData(RetrivedHunts.reverse());
        setloadingg(false)



      } catch (error) {
        console.log(error)
        setloadingg(false)
        alert("something went wrong !")
      }

    }

    fetchHunts()
  }, [])

  async function approveHunt() {
    console.log(theHuntid)
    try {
      setApproving(true)
      let updatedata = {
        id: theHuntid,
        updateData: {
          isApproved: true,
        }
      }
      const res = await axios.put(`${LocalHost}/auth/updateHunt`, updatedata, configuration);
      let dataToUpdate = {
        name: "string",
        description: "string",
        reward: "string",
        claims: 0
      }
      const botresponse = await axios.post("https://194.31.173.228/hunts", dataToUpdate)

      setApproving(false)
      alert("Approved successfully 🚀!!")
      window.location.reload()




    } catch (error) {
      console.log(error)
      setApproving(false)
      alert("something went wrong !")
    }
  }


  return (
    <section>
      {loadingg ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {HuntData && (
            <>
              <p>Approved data {HuntData.length}</p>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-8 px-3">
                {HuntData.map((huntsdata, i) => (
                  <HuntsCard
                    key={i}
                    huntInfo={huntsdata}
                    setShowModal={setShowModal}
                    theHuntid={theHuntid}
                    setHuntId={setHuntId}
                  />
                ))}
              </section>
            </>
          )}
        </>
      )}

      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to approve this raid?
            </h3>
            <div className="flex justify-center gap-4">
              {approving ? (
                <Spinner size="lg" />
              ) : (
                <Button
                  color="info"
                  onClick={() => approveHunt()}
                >
                  Yes, I'm sure
                </Button>
              )}

              <Button
                color="gray"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
}

const HuntsCard = ({ huntInfo, setShowModal, setHuntId, theHuntid }) => {


  function openModal(idd) {
    setHuntId(idd)
    setShowModal(true)
  }
  return (
    <div
      className="huntsCard cursor-pointer rounded-xl"
      data-reward={huntInfo.reward_type}>
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
        <div className="flex justify-between items-center">
          <div className="mt-3">
            <p className="textPrimary font-bold">Raids</p>
            <p className="text-white text-sm break-words">{huntInfo.claimable} Raids</p>
          </div>

          <div>
            <Badge color="info">
              Awaiting
            </Badge>
          </div>
        </div>

        <div className="sm:flex-row flex-col flex justify-between mt-3">
          <a href={huntInfo.tweet_url} target="_blank" className="btn">View Tweet</a>
          <Button color="success" onClick={() => openModal(huntInfo._id)}>
            Approve 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Approvehunts;
