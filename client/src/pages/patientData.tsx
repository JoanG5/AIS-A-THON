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
import { Input } from "@/components/ui/input";

type Props = {};

interface PatientDataResponse {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
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

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPatients(query);
  };

  const filterPatients = (query: string) => {
    const filtered = patientData.filter((patient) =>
      patient.id.toString().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[600px] m-5">
        <h2 className="font-bold text-2xl mb-2">Search Patients</h2>{" "}
        <Input
          type="text"
          placeholder="Search patients by ID"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
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
