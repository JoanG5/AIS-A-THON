import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {};

interface PatientDataResponse {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  DOB: string;
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree_function: number;
  age: number;
}

function PatientData({}: Props) {
  const [patientData, setPatientData] = useState<PatientDataResponse[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<
    PatientDataResponse[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchID, setSearchID] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchDOB, setSearchDOB] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<PatientDataResponse[]> = await axios.get(
          "http://localhost:8000/api/patient_data/"
        );
        setPatientData(response.data.data);
        setFilteredPatients(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredPatient = () => {
    let filteredPatients = patientData;
    if (searchID !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.id.toString().toLowerCase().includes(searchID.toLowerCase())
      );
    }
    if (searchName !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.first_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchDOB !== "") {
      filteredPatients = filteredPatients.filter((patient) =>
        patient.DOB.toString().includes(searchDOB.toLowerCase())
      );
    }

    setFilteredPatients(filteredPatients);
  };

    console.log(searchID, searchName, searchDOB);


  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[600px] m-5">
        <h2 className="font-bold text-2xl mb-2 text-center">Search Patients</h2>{" "}
        <div className="flex flex-row">
          <div className="m-3">
            <Label>Patient's ID</Label>
            <Input
              type="text"
              placeholder="Search patients by ID"
              onChange={(e) => {
                setSearchID(e.target.value);
                filteredPatient();
              }}
            />
          </div>
          <div className="m-3">
            <Label>Patient's Name</Label>
            <Input
              type="text"
              placeholder="Search patients by Name"
              onChange={(e) => {
                setSearchName(e.target.value);
                filteredPatient();
              }}
            />
          </div>
          <div className="m-3">
            <Label>Patient's DOB</Label>
            <Input
              type="date"
              placeholder="Search patients by DOB"
              onChange={(e) => {
                setSearchDOB(e.target.value);
                filteredPatient();
              }}
            />
          </div>
          <div className="m-3">
            <Label>&nbsp;</Label>
              <Button onClick={filteredPatient}>Search</Button>
          </div>
        </div>
      </div>
      <div className="w-11/12">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Blood Pressure</TableHead>
              <TableHead>BMI</TableHead>
              <TableHead>Glucose</TableHead>
              <TableHead>Insulin</TableHead>
              <TableHead>Pregnancies</TableHead>
              <TableHead>Skin Thickness</TableHead>
              <TableHead className="">Diabetes Pedigree</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  {patient.first_name} {patient.middle_name} {patient.last_name}
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.blood_pressure}</TableCell>
                <TableCell>{patient.bmi}</TableCell>
                <TableCell>{patient.glucose}</TableCell>
                <TableCell>{patient.insulin}</TableCell>
                <TableCell>{patient.pregnancies}</TableCell>
                <TableCell>{patient.skin_thickness}</TableCell>
                <TableCell className="">
                  {patient.diabetes_pedigree_function}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PatientData;
