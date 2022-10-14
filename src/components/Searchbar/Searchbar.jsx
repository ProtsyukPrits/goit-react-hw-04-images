import { Header, FormItem, SearchButton, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs' 
import { PropTypes } from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <FormItem autoComplete="off" onSubmit={onSubmit}>
        <Input
          type="text"
          name="query"
          placeholder="Search images and photos"
        />

        <SearchButton type="submit">
          <BsSearch size={15}/>
        </SearchButton>
      </FormItem>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
