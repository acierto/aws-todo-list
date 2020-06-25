import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
export default class Todo {
    @Field(_ => Int)
    id: number;

    @Field()
    note: string;
}
