import { useContext, Fragment } from 'react';
import { CateogoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CateogoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
