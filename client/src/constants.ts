const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const GRAPHQL_URL = 'http://localhost:4000/graphql';

enum Filter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
}

export {ENTER_KEY, ESCAPE_KEY, Filter, GRAPHQL_URL};
