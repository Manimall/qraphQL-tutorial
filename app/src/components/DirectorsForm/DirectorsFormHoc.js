import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/query';

import { styles } from './styles';


const withGraphQL = compose(
	graphql(addDirectorMutation, {
	// добавляем props addDirector, который принимает обьект с полями name и age
		props: ({ mutate }) => ({
			addDirector: director => mutate({
				variables: director,
				refetchQueries: [{ query: directorsQuery }],
			}),
		}),
	}),

	graphql(updateDirectorMutation, {
		props: ({ mutate }) => ({
			updateDirector: director => mutate({
				variables: director,
				refetchQueries: [{ query: directorsQuery }],
			}),
		}),
	}),
);


export default compose(withStyles(styles), withGraphQL);
