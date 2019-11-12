import { gql } from 'apollo-boost';

export const directorsForMovieDropdownQuery = gql`
    query directors {
        directors {
            id
            name
        }
    }
`;
