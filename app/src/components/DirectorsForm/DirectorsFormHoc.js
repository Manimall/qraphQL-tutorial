import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addDirectorMutation } from './mutation';
import { directorsQuery } from '../DirectorsTable/query';

import { styles } from './styles';

const withGraphqlAdd = graphql(addDirectorMutation, {
// добавляем props addDirector, который принимает обьект с полями name и age
	props: ({ mutate }) => ({
		addDirector: director => mutate({
			variables: director,
			refetchQueries: [{ query: directorsQuery }],
		}),
	}),
});

export default compose(withStyles(styles), withGraphqlAdd);
