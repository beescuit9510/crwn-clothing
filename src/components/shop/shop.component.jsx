import { useContext } from 'react';
import { CateogoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';
import './shop.styles.scss';
import { Routes, Route } from 'react-router-dom';
import Category from '../../routes/category/category.component';

const Shop = () => {
  const { categoriesMap } = useContext(CateogoriesContext);

  console.log(categoriesMap);
  return (
    <Routes>
      <Route index element={<CategoryPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;
