import AWS from 'aws-sdk';
import {ClientConfiguration} from 'aws-sdk/clients/dynamodb';
import {TodoData} from '../data';

const tableName = 'todo';

const todoSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'S'
        },
    ],
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: tableName,
    StreamSpecification: {
        StreamEnabled: false
    }
};

const config = (): ClientConfiguration => {
    if (process.env.NODE_ENV === 'dev') {
        return {
            endpoint: process.env.DB_URL,
            region: 'local',
            accessKeyId: 'local',
            secretAccessKey: 'local',
        };
    }

    return {
        region: 'eu-west-1',
        apiVersion: '2012-08-10',
    };
};

AWS.config.update(config());

const dynamo = new AWS.DynamoDB();
const client = new AWS.DynamoDB.DocumentClient();

export const createTable = () => {
    return new Promise((resolve, reject) => {
        dynamo.createTable(todoSchema, (err, data) => {
            if (err) return reject(err)
            dynamo.waitFor('tableExists', {TableName: tableName}, (_1, _2) => {
                if (err) reject(err);
                else {
                    resolve();
                }
            })
        })
    })
}

export const exists = () => {
    return new Promise((resolve, reject) => {
        dynamo.describeTable({
            TableName: tableName
        }, (err, data) => {
            if (err) return reject(false);
            return resolve(true);
        })
    })
}

export const saveTodo = (todo: TodoData) => {
    return new Promise((resolve, reject) => {
        client.put({
            TableName: tableName,
            Item: todo
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(true)
        })
    })
}

export const updateTodo = (todo: TodoData) => {
    return new Promise((resolve, reject) => {
        client.update({
            TableName: tableName,
            Key: {id: todo.id},
            UpdateExpression: 'SET #x = :title, #y = :completed',
            ExpressionAttributeNames: {
                '#x': 'title',
                '#y': 'completed',
            },
            ExpressionAttributeValues: {
                ':completed': todo.completed,
                ':title': todo.title
            }
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(true)
        })
    })
}

export const findTodo = (id: string): Promise<TodoData> => {
    return new Promise((resolve, reject) => {
        client.get({
            TableName: tableName,
            Key: {id}
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data.Item as TodoData);
        })
    })
}

export const removeTodo = (id: string) => {
    return new Promise((resolve, reject) => {
        client.delete({
            TableName: tableName,
            Key: {id}
        }, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(true)
        })
    })
}

export const listTodos = (): Promise<TodoData[]> => {
    return new Promise((resolve, reject) => {
        client.scan({
            TableName: tableName
        }, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve((data.Items || []) as TodoData[]);
        })
    })
}
