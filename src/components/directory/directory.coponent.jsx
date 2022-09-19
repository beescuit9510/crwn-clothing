import './directory.styles.scss';
import CateogryItem from '../category-item/category-item.component';

const Directory = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <CateogryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
