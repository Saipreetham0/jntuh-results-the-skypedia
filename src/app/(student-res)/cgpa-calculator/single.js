'use client';
import React from 'react';
// import PrintButton from '../ui/PrintButton';
// import ScrollToTop from "react-scroll-to-top";
// import HomeFooter from '../Home/HomeFooter';
// import Hr from '../Hr/Hr';
// import Footer from '../Home/Footer';
// import Info from '../Home/info';
import Branch from '../json/branch_codes.json';
import College from '../Json/college_codes.json';
import mpbranch from '../json/mpharmbranchcode.json'
import mbranch from '../json/mtechbranchcodes.json'
import Mba from '../json/mbabranchcode.json'

const SingleResults = ({ query }) => {
  console.log('Query Cross Checking', query);
  const Results = query['Results'];
  const Details = query['Details'];
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'P'];

  const collegeCode = Details['COLLEGE_CODE'];
  // const branchCode = Details['ROLL_NO'].slice(6, 8);

  // const branchName = Branch.find(item => item.Code === branchCode);

  // Check if F, Ab, or - grades are present
  const hasBacklogs = Object.keys(Results).some(val =>
    val !== 'Total' && Object.keys(Results[val]).some(item =>
      Results[val][item]['subject_grade'] === 'F' ||
      Results[val][item]['subject_grade'] === 'Ab' ||
      Results[val][item]['subject_grade'] === '-'
    )
  );
  console.log('Has Backlogs', hasBacklogs);

  const rollNumber = Details['ROLL_NO'];
  let branchName;

  if (rollNumber[5] === 'A' || rollNumber[5] === 'R') {
    const branchCode = rollNumber.slice(6, 8);
    branchName = Branch.find(item => item.Code === branchCode)?.Branch || '-';
  } else if (rollNumber[5] === 'D') {
    const branchCode = rollNumber.slice(6, 8);
    branchName = mbranch.find(item => item.Code === branchCode)?.Branch || '-';
  } else if (rollNumber[5] === 'S') {
    const branchCode = rollNumber.slice(6, 8);
    branchName = mpbranch.find(item => item.Code === branchCode)?.Branch || '-';
  } else if (rollNumber[5] === 'E') {
    const branchCode = rollNumber.slice(6, 8);
    console.log('Branch Code:', branchCode, branchName);
    branchName = Mba.find(item => item.Code === branchCode)?.Branch || '-';
  } else {
    branchName = '-';
  }

  const collegeName = College.find(item => item.Code === collegeCode);

  return (
    <>
      <br />
      <div className="items-center justify-center text-center ">
        <h1 className="text-xl font-semibold text-green-600 text-bold ">Consolidated Marks Memo (CMM)</h1>
        <br />
        {/* <Hr /> */}
      </div>
      <div className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
        <table className="w-[100%] my-1">
          <tbody>
            <tr class="mx-auto w-max bg-gray-200 dark:bg-slate-900">
              <th>ROLL NO</th><th>NAME</th><th>FATHER NAME</th><th>BRANCH</th>
            </tr>
            <tr>
              <th>{Details.ROLL_NO}</th>
              <th>{Details.NAME}</th>
              <th>{Details.FATHER_NAME}</th>
              <th className='uppercase'>{branchName}</th>
            </tr>
          </tbody>
        </table>

        <table className="w-[100%] my-1">
          <tbody>
            <tr class="mx-auto w-max bg-gray-200 dark:bg-slate-900">
              <th>COLLEGE CODE</th><th>COLLEGE NAME</th>
            </tr>
            <tr>
              <th>{Details.COLLEGE_CODE}</th><th className='uppercase'>{collegeName?.College || '-'}</th>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>SUBJECT CODE</th>
              <th>SUBJECT NAME</th>
              <th>INTERNAL</th>
              <th>EXTERNAL</th>
              <th>TOTAL</th>
              <th>GRADE</th>
              <th>CREDITS</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(Results).map((val) => {
              if (val !== 'Total') {
                return (
                  <>
                    <tr class="mx-auto w-max bg-gray-200 dark:bg-slate-900">
                      <th colSpan={7}>{val} Results</th>
                    </tr>
                    {Object.keys(Results[val]).map(function (item, index) {
                      if (item !== 'SGPA' && item !== 'total' && item !== 'credits' && item !== 'status') {
                        return (
                          <tr key={index}>
                            <th>{Results[val][item]['subject_code'] === "" ? "-" : Results[val][item]['subject_code']}</th>
                            <th>{Results[val][item]['subject_name'] === "" ? "-" : Results[val][item]['subject_name']}</th>
                            <th>{Results[val][item]['subject_internal'] === "" ? "-" : Results[val][item]['subject_internal']}</th>
                            <th>{Results[val][item]['subject_external'] === "" ? "-" : Results[val][item]['subject_external']}</th>
                            <th>{Results[val][item]['subject_total'] === "" ? "-" : Results[val][item]['subject_total']}</th>
                            <th className={` ${!grades.includes(Results[val][item]['subject_grade']) ? 'text-red-600' : 'text-green-600'}`}>
                              {Results[val][item]['subject_grade'] === "-" ? "MALPRACTICE" : Results[val][item]['subject_grade']}
                            </th>
                            <th>{Results[val][item]['subject_credits']}</th>
                          </tr>
                        );
                      }
                    })}
                    <tr>
                      <th colSpan={5}>SGPA</th>
                      <th colSpan={4} className={Results[val]['status'] === 'FAILED' ? 'text-red-600' : ''}>{Results[val]['SGPA']}</th>
                    </tr>
                  </>
                );
              }
            })}
          </tbody>
        </table>
        <div className='Total'>
          <table>
            <tbody >
              <tr>
                <th className="py-2" style={{ width: '75%' }}>Cumulative Grade Point Average - CGPA</th>
                <th className={`${hasBacklogs ? 'text-red-600' : ''}`}>{Results['Total']}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <Info /> */}
      {hasBacklogs && (
        <div className="mt-1 block text-center text-[#808080]  mb-4 text-[55%] md:text-[80%] text-red-600 m-6">
          <b>NOTE :-</b> The SGPA/CGPA for students who have backlogs is neither calculated or shown, as per SGPA/CGPA calculation guidelines .
          However, we calculate the SGPA/CGPA for the students who have backlogs for their convenience.
          The SGPA/CGPA is calculated through the following semester. <a href="/CGPAGuidelines.pdf" className='text-blue-400 hover:text-blue-600'>View SGPA/CGPA Guidelines</a>
        </div>
      )}
      {/* <Hr />
      <PrintButton />
      <ScrollToTop
        className='scroller'
        smooth
        viewBox="-5 0 18 18"
        svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
      />
      <HomeFooter /> */}
    </>
  )
}
export default SingleResults
