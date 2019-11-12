const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
} = graphql;

// импортируем экземпляры mongoose схемы
const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		genre: { type: new GraphQLNonNull(GraphQLString) },
		rate: { type: GraphQLInt },
		isWatched: { type: new GraphQLNonNull(GraphQLBoolean) },

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
		name: { type: new GraphQLNonNull(GraphQLString) },
		age: { type: new GraphQLNonNull(GraphQLInt) },

		movies: {
			type: new GraphQLList(MovieType),
			resolve({ id }, _args) {
				return Movies.find({ directorId: id })
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			// с помощью mongoose схемы определяем новую сущность - обьект с именем и возрастом
			resolve(parent, { name, age }) {
				const director = new Directors({
					name,
					age,
				});
				return director.save();
			},
		},

		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
				rate: { type: GraphQLInt },
				isWatched: { type: new GraphQLNonNull(GraphQLBoolean) },
			},
			resolve(parent, { name, genre, directorId, rate, isWatched, }) {
				const movie = new Movies({
					name,
					genre,
					directorId,
					isWatched,
					rate,
				});
				return movie.save();
			}
		},

		deleteDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, { id }) {
				return Directors.findByIdAndRemove(id)
			}
		},

		deleteMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, { id }) {
				return Movies.findByIdAndRemove(id)
			}
		},

		updateDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, { id, name, age }) {
				return Directors.findByIdAndUpdate(
					id,
					{ $set: { name, age } },
					{ new: true },
				)
			}
		},

		updateMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: new GraphQLNonNull(GraphQLID) },
				rate: { type: GraphQLInt },
				isWatched: { type: new GraphQLNonNull(GraphQLBoolean) },
			},
			resolve(parent, { id, name, genre, directorId, rate, isWatched, }) {
				return Movies.findByIdAndUpdate(
					id,
					{ $set: { name, genre, directorId, rate, isWatched, } },
					{ new: true },
				)
			}
		}
	}
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
			args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Movies.find({
					name: { $regex: name, $options: 'i' }
				});
			},
		},

		directors: {
			type: new GraphQLList(DirectorType),
			args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Directors.find({
					name: { $regex: name, $options: 'i' }
				});
			},
		}
	}
});

module.exports = new GraphQLSchema({
	query: Query,
	mutation: Mutation,
});
