import {Map} from 'immutable';
import {GraphQLNonNull} from 'graphql';
import {getById} from '../../db/queries';
import ReindexID from '../builtins/ReindexID';
import createRootField from '../createRootField';

export default function createGet({type}) {
  return createRootField({
    name: 'get' + type.name,
    returnType: type,
    args: Map({
      id: {
        name: 'id',
        description: `id of ${type.name}`,
        type: new GraphQLNonNull(ReindexID),
      },
    }),
    resolve: (parent, {id}, {dbContext}) => (
      getById(dbContext, type.name, id).run(dbContext.conn)
    ),
  });
}
