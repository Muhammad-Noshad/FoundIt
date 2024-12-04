import "./SearchBar.css";

const SearchBar = ({ jobTitle, setJobTitle, jobLocation, setJobLocation, companyName, setCompanyName }) => {
  return (
    <section className="search-bar">
      <div className="inputs">
        <input 
          type="text" 
          placeholder="Enter Job Title" 
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter Job Location" 
          value={jobLocation}
          onChange={e => setJobLocation(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter Company Name" 
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
      </div>
      <button className="button-primary">Search</button>
    </section>
  );
}
 
export default SearchBar;