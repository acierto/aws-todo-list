import {Field, InputType} from 'type-graphql';
import {IsEmail, Length} from 'class-validator';

@InputType()
export class TodoInput {
    @Field()
    @Length(1, 255)
    note: string;
}
