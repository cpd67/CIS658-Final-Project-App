import * as React from 'react';
import { apiUrl } from './utils';
import { CategoryList } from '../lists/CategoryList';

export const Categories = props => {
    const { user } = props;
    const [categoriesList, setCategoriesList] = React.useState([]);
    const fetchCategories = () => {
        fetch(`${apiUrl}/users/${user.id}/categories`
        ).then(res => res.json()
        ).then(data => setCategoriesList(data));
    }

    React.useEffect(() => fetchCategories(), [categoriesList.length]);

    return <CategoryList categories={categoriesList} />;
}