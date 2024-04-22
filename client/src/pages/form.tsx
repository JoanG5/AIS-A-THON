import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {};

function form({}: Props) {
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
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

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="m-5">
            <Label>Name</Label>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="m-5">
            <Label>DOB</Label>
            <Input
              type="date"
              onChange={(e) => {
                setDob(e.target.value)
                calculateAge(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="m-5">
            <Label>Amount of Pregnancies</Label>
            <Input
              type="number"
              onChange={(e) => {
                setPregnancies(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Plasma Glucose Concentration</Label>
            <Input
              type="number"
              onChange={(e) => {
                setPlasmaGlucoseConcentration(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Diastolic Blood Pressure (mm Hg)</Label>
            <Input
              type="number"
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
              onChange={(e) => {
                setTricepsSkinfoldThickness(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>2-Hour Serum Insulin (mu U/ml)</Label>
            <Input
              type="number"
              onChange={(e) => {
                setSerumInsulin(parseInt(e.target.value, 10));
              }}
            />
          </div>
          <div className="m-5">
            <Label>Body mass index (weight in kg / height in m^2)</Label>
            <Input
              type="decimal"
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
              pattern="^\d*(\.\d{0,2})?$"
              onChange={(e) => {
                setDiabetesPedigreeFunction(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="m-5">
            <Label>2-Hour Serum Insulin (mu U/ml)</Label>
            <Input
              type="number"
              pattern="^\d*(\.\d{0,2})?$"
              onChange={(e) => {
                setSerumInsulin(parseFloat(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="m-5 w-3/6">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default form;
