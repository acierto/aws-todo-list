import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
export default class Todo {
    @Field(_ => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    completed: boolean;
}
