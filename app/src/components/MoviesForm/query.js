import { gql } from 'apollo-boost';

export const directorsForMovieDropdownQuery = gql`
    query directors ($name: String) {
        directors (name: $name) {
            id
            name
        }
    }
`;
