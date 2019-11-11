const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const movies = [
	{ id: '1', name: 'Pulp Fiction', genre: 'Crime', director: 'Quentin Tarantino', },
	{ id: '2', name: '1984', genre: 'Sci-Fi', director: 'Michael Radford', },
	{ id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', director: 'Quentin Tarantino' },
	{ id: '4', name: 'Snatch', genre: 'Crime-Comedy', director: 'Guy Ritchie' },
];

const directors = [
	{ id: '1', name: 'Quentin Tarantino', age: 55 },
	{ id: '2', name: 'Michael Radford', age: 72 },
	{ id: '3', name: 'James McTeigue', age: 51 },
	{ id: '4', name: 'Guy Ritchie', age: 50 },
];

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },

		directedBy: {
			type: DirectorType,
			resolve(parent, _args) {
				return directors.find(director => director.name === parent.director)
			}
		}
	}),
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
	})
});

// корневой запрос, содержащий все под-запросы
const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		movie: {
			type: MovieType,
			// аргументы запроса
			args: { id: { type: GraphQLID } },
			// метод resolve на основании полученных аргументов возвращает определенный элемент из коллекции
			resolve(parent, args) {
				return movies.find(movie => movie.id === args.id);
			},
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return directors.find(director => director.id === args.id);
			},
		},
	}
});

module.exports = new GraphQLSchema({
	query: Query,
});
