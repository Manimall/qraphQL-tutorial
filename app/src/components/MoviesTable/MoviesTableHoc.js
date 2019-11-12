import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { moviesQuery } from './query';

import { styles } from './styles';

export default compose(withStyles(styles), graphql(moviesQuery));
