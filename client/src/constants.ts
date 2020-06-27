const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const dev = {
    GRAPHQL_URL: 'http://localhost:4000/graphql'
};

const prod = {
    GRAPHQL_URL: 'http://aws-todo-list-server-env.eba-6tg2as6i.eu-west-1.elasticbeanstalk.com/graphql'
};

export const Config = process.env.REACT_APP_STAGE === 'dev' ? dev : prod;

export enum Filter {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
}

export {ENTER_KEY, ESCAPE_KEY};
