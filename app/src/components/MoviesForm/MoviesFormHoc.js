import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from 'react-apollo';

import { addMovieMutation, updateMovieMutation } from './mutations';
import { moviesQuery } from '../MoviesTable/query';
import { directorsForMovieDropdownQuery as directorsQuery } from './query';

import { styles } from './styles';

const withGraphQL = compose(
	graphql(addMovieMutation, {
		props: ({ mutate }) => ({
			// prop addMovie будет доступен в компоненте
			addMovie: movie => mutate({
				variables: movie,
				refetchQueries: [{
					query: moviesQuery,
					variables: { name: '' },
				}],
			}),
		}),
	}),

	graphql(updateMovieMutation, {
		props: ({ mutate }) => ({
			updateMovie: movie => mutate({
				variables: movie,
				refetchQueries: [{
					query: moviesQuery,
					variables: { name: '' },
				}],
			}),
		}),
	}),

	graphql(directorsQuery, {
		options: ({ name = '' }) => ({
			variables: { name },
		}),
	}),
);

export default compose(withStyles(styles), withGraphQL);
