import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { NavLink as Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Header1 from "../Layout/Header1.js";
import Footer from "../Layout/Footer.js";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import NoteContext from "../../useContext/NoteContext.js";
import { SmartButton } from "@mui/icons-material";

export default function Payment() {
  const [customername, setCustomername] = useState("");
  // const [cardno, setCardno] = useState();
  const [password, setPassword] = useState("");
  const [instructions, setInstructions] = useState("");
  const [amount, setAmount] = useState("");
  const [disAmount, setDisAmount] = useState("");
  const [show, setShow] = useState(false);
  var consumer = localStorage.getItem("customername");
  var csname = localStorage.getItem("cname");
  const valueContext = useContext(NoteContext);
  const [cardno, setCardNo] = useState("");
  const [cardNoError, setCardNoError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setCustomername(e.target.value);
  }

  const handleChange1 = (event) => {
    const { value } = event.target;
    setCardNo(value);

    // Validate the card number
    const isValidCardNo = validateCardNo(value);
    if (isValidCardNo) {
      setCardNoError("");
    } else {
      setCardNoError("Please enter a valid card number");
    }
  };

  const validateCardNo = (cardNo) => {
    // Implement your validation logic here
    // Return true if the card number is valid, false otherwise
    // You can use regular expressions, third-party libraries, or custom validation rules

    // Example: validating a 16-digit card number
    return /^\d{16}$/.test(cardNo);
  };

  // const DiscountChip = ({ amount, disAmount }) => {
  //   const discountPercentage = Math.ceil(((amount - disAmount) / amount) * 100);

  function handleChange(e) {
    e.preventDefault();
    setInstructions(e.target.value);
  }

  function handleChange2(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  useEffect(() => {
    setAmount(localStorage.getItem("gross"));
    setCustomername(localStorage.getItem("cname"));
    console.log(csname, "cusname");
    console.log(consumer, "consumer...");
    Axios.get(
      `http://localhost:4700/discount/${csname ? csname : consumer}`
    ).then((res) => {
      console.log(res.count, "datares");

      var count = localStorage.setItem("count", res.data.length);

      // if (res.data.length <= 0) {
      //   console.log(amount, "grossamount");
      //   var total = amount;
      //   var discountPrice = 0.7;
      //   var discountedTotal = total - total * discountPrice;

      //   console.log(discountedTotal, "totaldiscount");
      //   setDisAmount(discountedTotal);
      //   localStorage.setItem("discountPrice",JSON.stringify (discountedTotal));
      // }
      // if (res.data.length > 0) {
      //   localStorage.setItem("discountPrice",JSON.stringify (null));
      //   setShow(true);

      // }
      const currentHour = new Date().getHours();
      if (res.data.length <= 0) {
        console.log(amount, "grossamount");
        var total = amount;
        var discountPrice = 0.7;
        var discountedTotal = total - total * discountPrice;

        console.log(discountedTotal, "totaldiscount");
        setDisAmount(discountedTotal);
        localStorage.setItem("discountPrice", JSON.stringify(discountedTotal));
      } else if (
        res.data.length > 0 &&
        currentHour >= 13 &&
        currentHour <= 15
      ) {
        var total = amount;
        var discPrice = 0.5;
        var discntTotal = total - total * discPrice;
        setDisAmount(discntTotal);
        localStorage.setItem("discountPrice", JSON.stringify(discntTotal));

        // localStorage.setItem("discountPrice",JSON.stringify (null));
        // setShow(true);
      } else {
        localStorage.setItem("discountPrice", JSON.stringify(null));
        setShow(true);
      }
    });
  }, [amount]);

  function mysubmit() {
    const data = {
      cname: customername ? customername : consumer,
      cardno: cardno,
      amount: disAmount ? disAmount : amount,
      instructions: instructions,
      products: JSON.parse(localStorage.getItem("items")),
    };

    let config = {
      method: "POST",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        // "Content-Type": "multipart/form-data",
      },
    };
    console.log(data);

    Axios.post("http://localhost:4700/payment", data, config).then((res) =>
      console.log("payment done")
    );
    // setCardno();
    // setPassword("");
    valueContext.setCount(0);

    window.alert("payment done");
  }

  return (
    <div>
      <Header1 />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              type="text"
              value={customername ? customername : consumer}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Card No</Form.Label>

            <Form.Control type="text" value={cardno} onChange={handleChange1} />
            {cardNoError && <div className="error-message">{cardNoError}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCVV">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              placeholder="CVV"
              value={password}
              onChange={handleChange2}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Personalised Instructions for Service Provider
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Instructions"
              value={instructions}
              onChange={handleChange}
              name="instructions"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" placeholder="Amount" value={amount} />
          </Form.Group>

          {!show ? (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              {
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${Math.ceil(
                      ((amount - disAmount) / amount) * 100
                    )}% discount applied`}
                    deleteIcon={<DoneIcon />}
                  />
                </Stack>
              }
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amount"
                value={disAmount}
              />
            </Form.Group>
          ) : (
            ""
          )}
          <Button variant="primary" type="button" onClick={mysubmit}>
            Submit
          </Button>
        </Form>

        <Link className="button4" text-decoration="none" to="/bill">
          <Button
            variant="secondary"
            style={{ position: "relative", right: "-1000px" }}
          >
            Bill Generate
          </Button>
        </Link>
      </Container>
      <br />
      <br />
    </div>
  );
}
