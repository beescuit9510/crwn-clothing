import { Fragment, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import './category.styles.scss';
import { CateogoriesContext } from '../../contexts/categories.context';
import { useEffect } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
  const { category } = useParams();

  const { categoriesMap } = useContext(CateogoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title '>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
