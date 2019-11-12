import { gql } from 'apollo-boost';

export const addMovieMutation = gql`
    mutation addMovie ($name: String!, $genre: String!, $isWatched: Boolean!, $rate: Int, $directorId: ID) {
        addMovie(name: $name, genre: $genre, directorId: $directorId, isWatched: $isWatched, rate: $rate) {
            name
            genre
						isWatched
        }
    }
`;
