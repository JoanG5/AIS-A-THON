import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {};
interface PatientData {
  id: number;
  dob: string;
  pregnancies: number;
  plasmaGlucoseConcentration: number;
  diastolicBloodPressure: number;
  tricepsSkinfoldThickness: number;
  serumInsulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

function PatientData({}: Props) {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/patient_data");
      console.log("result.data");
      console.log(result.data);
      //   result
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // };
    };
    fetchData();
  }, []);

  return <div>patientData</div>;
}

export default PatientData;
