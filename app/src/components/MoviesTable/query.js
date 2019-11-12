import { gql } from 'apollo-boost';

export const moviesQuery = gql`
    query movies {
        movies {
						id
            name
            genre
						isWatched
						rate
						
            director {
								name
						}
        }
    }
`;
