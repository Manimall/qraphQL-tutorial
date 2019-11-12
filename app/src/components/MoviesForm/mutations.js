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

export const updateMovieMutation = gql`
    mutation updateMovie ($id: ID, $name: String!, $genre: String!, $isWatched: Boolean!, $directorId: ID!, $rate: Int) {
        updateMovie (id: $id, genre: $genre, name: $name, directorId: $directorId, isWatched: $isWatched, rate: $rate) {
            name
            director{
                name
            }
        }
    }
`;
