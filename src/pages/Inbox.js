import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mailAction } from "../store/mail";

const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://mailbox-3601b-default-rtdb.firebaseio.com/mail.json"
        );

        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error(err.error.message);
        }

        const data = await response.json();
        data.map((item) => {
          dispatch(mailAction.addEmail(item));
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h2>Inbox Page</h2>
    </>
  );
};

export default Inbox;
