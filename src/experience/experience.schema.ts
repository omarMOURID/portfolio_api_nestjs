import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ExperienceDocument = HydratedDocument<Experience>;

@Schema({timestamps: true})
export class Experience {
    @Prop({type: String,required: true})
    title: String;

    @Prop({type: String, required: true})
    description: String;

    @Prop({type: String, required: true})
    company: String;

    @Prop({type: Number, required: true})
    durationInMonths: Number;

    @Prop({type: String, required: true})
    carriedAt: String;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);