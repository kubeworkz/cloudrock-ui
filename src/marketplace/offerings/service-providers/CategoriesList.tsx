import { FunctionComponent, useEffect, useState } from 'react';

import { CategoriesListHeader } from '@cloudrock/marketplace/offerings/service-providers/CategoriesListHeader';
import { Category } from '@cloudrock/marketplace/types';
import './CategoriesList.scss';

interface CategoriesListProps {
  categories: Category[];
  onCategoryChange: (newCategory: string) => void;
}

export const CategoriesList: FunctionComponent<CategoriesListProps> = ({
  categories,
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(null);

  const selectCategory = (uuid: string) => {
    if (uuid === selectedCategory) {
      return;
    }
    setSelectedCategory(uuid);
  };

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [onCategoryChange, selectedCategory]);

  return (
    <div className="categoriesListContainer">
      <CategoriesListHeader
        categories={categories}
        onClearCategoriesFilter={() => setSelectedCategory(null)}
      />
      <ul>
        {categories.map((category: Category, i: number) => (
          <li
            key={i}
            className={selectedCategory === category.uuid ? 'active' : ''}
            onClick={() => selectCategory(category.uuid)}
          >
            {category.title} ({category.offering_count})
          </li>
        ))}
      </ul>
    </div>
  );
};
