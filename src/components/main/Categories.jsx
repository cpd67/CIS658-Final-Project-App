import * as React from 'react';
import { apiUrl } from './utils';
import { CategoryList } from '../lists/CategoryList';

export const Categories = props => {
    const { userId } = props;
    const [categoriesList, setCategoriesList] = React.useState([
        {
            id: 1, 
            name: 'Category!'
        },
    ]);
    const fetchCategories = () => {
        fetch(`${apiUrl}users/${userId}/categories`
        ).then(res => res.json()
        ).then(data => setCategoriesList(data));
    }

    React.useEffect(() => fetchCategories());

    return <CategoryList categories={categoriesList} />;
}