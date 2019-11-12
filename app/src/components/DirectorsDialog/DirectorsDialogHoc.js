import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteDirectorMutation } from './mutation';
import { directorsQuery } from '../DirectorsTable/query';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
	props: ({ mutate }) => ({
		deleteDirector: id => mutate({
			variables: id,
			refetchQueries: [{
				query: directorsQuery,
				variables: { name: '' },
			}],
		}),
	}),
});

export default compose(withGraphqlDelete);
