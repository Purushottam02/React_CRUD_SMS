const SearchBar = (props) => {
  const { onSearchInputChange } = props;
  const handleChange = (e) => {
    e.preventDefault();
    onSearchInputChange(e.target.value);
  };
  return (
    <div>
      <input type="search" placeholder="Search here" onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
