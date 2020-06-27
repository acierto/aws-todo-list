import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export default class Todo {
    @Field()
    id: string;

    @Field()
    title: string;

    @Field()
    completed: boolean;
}
