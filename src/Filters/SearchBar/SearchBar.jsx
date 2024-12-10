import "./SearchBar.css";

const SearchBar = ({ values, setters, placeholders }) => {
  return (
    <section className="search-bar">
      <div className="inputs">
        {
          values?.map((value, index) => (
            <input 
              key={index}
              type="text" 
              placeholder={placeholders[index]} 
              value={value}
              onChange={e => setters[index](e.target.value)}
            />   
          ))
        }
      </div>
      <button className="button-primary">Search</button>
    </section>
  );
}
 
export default SearchBar;