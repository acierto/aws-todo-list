import {Field, InputType} from 'type-graphql';
import {Length} from 'class-validator';

@InputType()
export class TodoInput {
    @Field()
    @Length(1, 255)
    title: string;
}
