import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

const DeleteModal = (props) => {
  const [deleteModal, setdeleteModal] = useState(false);

  const style = {
    backgroundColor: "#dc3545",
  };

  const handleClick = (userId) => {
    console.log(userId);
  };
  return (
    <React.Fragment>
      <Button
        onClick={() => setdeleteModal(true)}
        className="p-2 w-13 mt-2 mb-2 mr-2 text-center rounded"
        style={style}
      >
        Delete
      </Button>
      <Modal
        show={deleteModal}
        size="md"
        popup={true}
        onClick={() => setdeleteModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {/* <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this User?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleClick(props.userAddress)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray">No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteModal;
