import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

function form({}: Props) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [pregnanciesDisabled, setPregnanciesDisabled] = useState(false);
  const [pregnancies, setPregnancies] = useState<number>(0);
  const [plasmaGlucoseConcentration, setPlasmaGlucoseConcentration] =
    useState<number>(0);
  const [diastolicBloodPressure, setDiastolicBloodPressure] =
    useState<number>(0);
  const [tricepsSkinfoldThickness, setTricepsSkinfoldThickness] =
    useState<number>(0);
  const [serumInsulin, setSerumInsulin] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] =
    useState<number>(0);
  const [age, setAge] = useState<number>(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    setPregnanciesDisabled(event.target.value === "male");
    if (event.target.value === "male") {
      setPregnancies(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("middleName", middleName);
    formData.append("dob", dob);
    formData.append("pregnancies", pregnancies.toString());
    formData.append(
      "plasmaGlucoseConcentration",
      plasmaGlucoseConcentration.toString()
    );
    formData.append(
      "diastolicBloodPressure",
      diastolicBloodPressure.toString()
    );
    formData.append(
      "tricepsSkinfoldThickness",
      tricepsSkinfoldThickness.toString()
    );
    formData.append("serumInsulin", serumInsulin.toString());
    formData.append("bmi", bmi.toString());
    formData.append(
      "diabetesPedigreeFunction",
      diabetesPedigreeFunction.toString()
    );
    formData.append("age", age.toString());
    try {
      const request = await axios.post(
        "http://localhost:8000/api/patient_data/",
        formData
      );
      console.log(request.data);
      handleOpen();
      window.location.href = "/#/hub";
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dob);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="m-5">
            <Label>Patient's First Name</Label>
            <Input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="m-5">
            <Label>Patient's Middle Name</Label>
            <Input
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </div>
          <div className="m-5">
            <Label>Patient's Last Name</Label>
            <Input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="m-5">
            <Label>Date of Birth</Label>
            <Input
              type="date"
              onChange={(e) => {
                setDob(e.target.value);
                calculateAge(e.target.value);
              }}
            />
          </div>
          <div className="m-5">
            <Label>Sex</Label>
            <div className="flex flex-row mt-2">
              <label className="mr-2">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sex === "male"}
                  onChange={handleSexChange}
                />
                Male
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sex === "female"}
                  onChange={handleSexChange}
                />
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="m-5">
            <Label>Amount of Pregnancies</Label>
            <Input
              type="number"
              min={0}
              disabled={pregnanciesDisabled}
              onChange={(e) => {
                setPregnancies(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Plasma Glucose Concentration</Label>
            <Input
              type="number"
              min={0}
              onChange={(e) => {
                setPlasmaGlucoseConcentration(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Diastolic Blood Pressure (mm Hg)</Label>
            <Input
              type="number"
              min={0}
              onChange={(e) => {
                setDiastolicBloodPressure(parseInt(e.target.value, 10));
              }}
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="m-5">
            <Label>Triceps Skinfold Thickness (mm)</Label>
            <Input
              type="number"
              min={0}
              onChange={(e) => {
                setTricepsSkinfoldThickness(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>2-Hour Serum Insulin (mu U/ml)</Label>
            <Input
              type="number"
              min={0}
              onChange={(e) => {
                setSerumInsulin(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Body mass index (weight in kg / height in m^2)</Label>
            <Input
              type="number"
              step=".01"
              min={0}
              onChange={(e) => {
                setBmi(parseFloat(e.target.value));
              }}
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="m-5">
            <Label>Diabetes Pedigree Function</Label>
            <Input
              type="number"
              step=".01"
              min={0}
              onChange={(e) => {
                setDiabetesPedigreeFunction(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="m-5">
            <Label>2-Hour Serum Insulin (mu U/ml)</Label>
            <Input
              type="number"
              min={0}
              onChange={(e) => {
                setSerumInsulin(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" onClick={handleSubmit} className="m-5 w-3/6">
            Submit
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1
                id="modal-modal-title"
                className="text-center text-2xl font-bold"
              >
                Patient's Data Submitted
              </h1>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="m-10 w-3/6"
                >
                  <Link to="/hub"> Head to Hub</Link>
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default form;
