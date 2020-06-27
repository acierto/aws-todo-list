const ENTER_KEY = 13;
const ESCAPE_KEY = 27;
const GRAPHQL_URL = 'http://aws-todo-list-server-env.eba-6tg2as6i.eu-west-1.elasticbeanstalk.com/graphql';

enum Filter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
}

export {ENTER_KEY, ESCAPE_KEY, Filter, GRAPHQL_URL};
