import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ContactDocument = HydratedDocument<Contact>;

@Schema({ timestamps: true })
export class Contact {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    email: string;

    @Prop({type: String, required: true})
    subject: string;

    @Prop({type: String, required: true})
    message: string;

    @Prop({type: Boolean, required: true, default: false})
    alreadySeen: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);