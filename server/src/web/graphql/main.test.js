// @flow

import {graphql} from "graphql";
import {schema} from './main';

test('init GraphQL schema', async () => {
  const request = `
    {
      __schema {
        types {
          name
        }
      }
    }
    `;
  const response = await graphql(schema, request);
  console.log(JSON.stringify(response));
});
