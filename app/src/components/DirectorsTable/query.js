import { gql } from 'apollo-boost';

export const directorsQuery = gql`
    query directors ($name: String) {
				directors (name: $name) {
            id
            name
            age

            movies {
                name
                id
                isWatched
            }		
				}
    }
`;
