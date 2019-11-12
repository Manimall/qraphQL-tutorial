const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// импортируем экземпляры mongoose схемы
const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },

		director: {
			type: DirectorType,
			resolve({ directorId }, _args) {
				return Directors.findById(directorId)
			}
		},
	}),
});

const DirectorType = new GraphQLObjectType({
	name: 'Director',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },

		movies: {
			type: new GraphQLList(MovieType),
			resolve({ id }, _args) {
				return Movies.find({ directorId: id })
			}
		}
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
				return Movies.findById(args.id);
			},
		},

		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Directors.findById(args.id);
			},
		},

		movies: {
			type: new GraphQLList(MovieType),
			resolve(_parent, _args) {
				return Movies.find({});
			}
		},

		directors: {
			type: new GraphQLList(DirectorType),
			resolve(_parent, _args) {
				return Directors.find({});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: Query,
});
