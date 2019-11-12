import { gql } from 'apollo-boost';

export const moviesQuery = gql`
    query movies ($name: String) {
        movies (name: $name) {
						id
            name
            genre
						isWatched
						rate
						
            director {
                id
								name
						}
        }
    }
`;
