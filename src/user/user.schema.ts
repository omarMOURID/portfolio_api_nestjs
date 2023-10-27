import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({type: String})
    firstname: String;

    @Prop({type: String})
    lastname: String;

    @Prop({type: Number})
    age: Number;

    @Prop({type: String})
    description: String;

    @Prop({type: String})
    mail: String;

    @Prop({type: String})
    phoneNumber: String;

    @Prop({type: String})
    Location: String;

    @Prop({type: String})
    image: String;

    @Prop({
        type: [{ 
            type: { type: String, enum: ["github", "linkedIn", "instagram"], required: true }, 
            link: { type: String, required: true } 
        }],
        validate: {
            validator: function (v) {
                return v.length <= 3;
            },
            message: props => `The array should not contain more than 3 elements!`
        }
    })
    socialMedia: {
        type: String,
        link: String,
    }[]
}

export const UserSchema = SchemaFactory.createForClass(User);