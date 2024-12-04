import "./JobSalaryFilter.css";

const JobSalaryFilter = ({ minSalary, setMinSalary, maxSalary, setMaxSalary }) => {
  return (
    <section className="job-salary-filter">
      <input 
        type="number"   
        placeholder="Min Salary"
        value={minSalary}
        onChange={e => setMinSalary(e.target.value)}
      />
      <input 
        type="number"   
        placeholder="Max Salary"
        value={maxSalary}
        onChange={e => setMaxSalary(e.target.value)}
      />
    </section>
  );
}
 
export default JobSalaryFilter;