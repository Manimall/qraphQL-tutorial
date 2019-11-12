import { compose } from 'recompose';
import {graphql} from 'react-apollo';

import { deleteMovieMutation } from './mutation';
import { moviesQuery } from '../MoviesTable/query';


const withGraphqlDelete = graphql(deleteMovieMutation, {
	props: ({ mutate }) => ({
		deleteMovie: id => mutate({
			variables: id,
			refetchQueries: [{
				query: moviesQuery,
				variables: { name: '' },
			}],
		}),
	}),
});

export default compose(withGraphqlDelete);
