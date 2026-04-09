import { useState } from "react";
import { submitReport } from "../services/reportService";

function SubmitReport() {

  const [reportDate, setReportDate] = useState("");
  const [tasksDone, setTasksDone] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await submitReport({
        report_date: reportDate,
        tasks_done: tasksDone,
        hours_worked: hoursWorked
      });

      alert("Report submitted!");

      setReportDate("");
      setTasksDone("");
      setHoursWorked("");

    } catch (error) {

      console.error("Submit error:", error.response?.data);
      alert(JSON.stringify(error.response?.data));

    }
  };

  return (
    <div>
      <h1>Submit Daily Report</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Date</label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
        </div>

        <div>
          <label>Tasks Done</label>
          <textarea
            value={tasksDone}
            onChange={(e) => setTasksDone(e.target.value)}
          />
        </div>

        <div>
          <label>Hours Worked</label>
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
          />
        </div>

        <button type="submit">Submit Report</button>

      </form>
    </div>
  );
}

export default SubmitReport;