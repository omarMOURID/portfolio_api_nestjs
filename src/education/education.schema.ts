import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type EducationDocument = HydratedDocument<Education>;

@Schema({ timestamps: true })
export class Education {
    @Prop({type: String, required: true})
    title: String;

    @Prop({type: String, required: true})
    location: String;

    @Prop({type: String, required: true})
    description: String;

    @Prop({type: String, required: true})
    from: String;

    @Prop({type: String, required: true})
    to: String;

    @Prop({type: String, required: true})
    inProgress: Boolean;
}

export const EducationSchema = SchemaFactory.createForClass(Education);