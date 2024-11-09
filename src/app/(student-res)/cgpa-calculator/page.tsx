"use client";
// import React, { useState, useEffect  } from "react";
// import axios from "axios";

// export default function cgpa() {

//   // const [htno, setHtno] = useState("");
//   // const [warning, setWarning] = useState("");

//   const submit = async () => {

//     if (htno.length !== 10) {
//       setWarning("The Hall Ticket Should be 10 digits");
//     } else {}
//   }


//   const inputEvent = (event) => {
//     event.target.value = event.target.value.toUpperCase();
//     setHtno(event.target.value);
//   }



//   return (
//     <div className="p-10 flex flex-col items-center">
//       <h1 className="mb-2 font-bold text-3xl text-center">CGPA Calculator</h1>
//       <p></p>

//       {/* <form onSubmit={handleSubmit}> */}
//       <div className="w-1/2 lg:w-1/6 md:1/4 mt-3">
//         <div className="mt-1">
//           <input
//             type="text"
//             name="htno"
//             onChange={inputEvent}

//             maxLength="10"
//             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
//             placeholder="Roll Number"
//           />
//         </div>
//         <button
//           // type="submit"
//           onClick={submit}
//           className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Submit
//         </button>
//       </div>

//       {/* </form> */}
//     </div>
//   );
// }



import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, School, ChevronRight } from "lucide-react";

interface CalculatorCard {
  title: string;
  content: string;
  url: string;
}

const calculatorCards: CalculatorCard[] = [
  {
    title: "CGPA to Percentage",
    content: "Convert CGPA to percentage easily",
    url: "/cgpa-percentage-converter"
  },
  {
    title: "Percentage to CGPA",
    content: "Convert percentage to CGPA quickly",
    url: "/percentage-to-cgpa-calculator"
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
  },
  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
  },

];

interface SemesterInput {
  credits: string;
  grade: string;
}

const CGPACalculator = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [warning, setWarning] = useState("");
  const [manualInputs, setManualInputs] = useState<SemesterInput[]>([
    { credits: "", grade: "" }
  ]);
  const [result, setResult] = useState<number | null>(null);

  const handleRollNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setRollNumber(value);
    setWarning("");
  };

  const handleAutoSubmit = () => {
    if (rollNumber.length !== 10) {
      setWarning("Roll Number must be 10 digits long");
      return;
    }
    // Here you would typically make an API call to fetch results
    setWarning("Fetching results...");
  };

  const addSemester = () => {
    setManualInputs([...manualInputs, { credits: "", grade: "" }]);
  };

  const updateSemesterInput = (index: number, field: keyof SemesterInput, value: string) => {
    const newInputs = [...manualInputs];
    newInputs[index][field] = value;
    setManualInputs(newInputs);
  };

  const calculateManualCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    manualInputs.forEach(input => {
      const credits = parseFloat(input.credits) || 0;
      const grade = parseFloat(input.grade) || 0;

      if (credits > 0 && grade > 0) {
        totalCredits += credits;
        totalPoints += credits * grade;
      }
    });

    if (totalCredits > 0) {
      setResult(totalPoints / totalCredits);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">CGPA Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your CGPA automatically or manually
        </p>
      </div>

      <Tabs defaultValue="auto" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="auto">
            <School className="mr-2 h-4 w-4" />
            Automatic
          </TabsTrigger>
          <TabsTrigger value="manual">
            <Calculator className="mr-2 h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auto">
          <Card>
            <CardHeader>
              <CardTitle>Automatic CGPA Calculation</CardTitle>
              <CardDescription>
                Enter your roll number to fetch and calculate your CGPA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter Roll Number"
                  value={rollNumber}
                  onChange={handleRollNumberChange}
                  maxLength={10}
                  className="text-center"
                />
                {warning && (
                  <Alert variant="destructive">
                    <AlertDescription>{warning}</AlertDescription>
                  </Alert>
                )}
                <Button
                  onClick={handleAutoSubmit}
                  className="w-full"
                >
                  Calculate CGPA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual CGPA Calculation</CardTitle>
              <CardDescription>
                Enter your semester-wise credits and grades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manualInputs.map((input, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Credits"
                      value={input.credits}
                      onChange={(e) => updateSemesterInput(index, "credits", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Grade Points"
                      value={input.grade}
                      onChange={(e) => updateSemesterInput(index, "grade", e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addSemester}
                  className="w-full"
                >
                  Add Semester
                </Button>
                <Button
                  onClick={calculateManualCGPA}
                  className="w-full"
                >
                  Calculate CGPA
                </Button>
                {result !== null && (
                  <Alert>
                    <AlertDescription>
                      Your CGPA is: {result.toFixed(2)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculatorCards.map((card, index) => (
          <Link href={card.url} key={index}>
            <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {card.title}
                  <ChevronRight className="h-5 w-5" />
                </CardTitle>
                <CardDescription>{card.content}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CGPACalculator;