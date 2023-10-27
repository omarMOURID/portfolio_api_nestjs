import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Tool } from "../tools/tools.schema";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({timestamps: true})
export class Project {
    @Prop({
        type: String, 
        required: true
    })
    title: string;

    @Prop({
        type: String, 
        required: true
    })
    description: string;

    @Prop({
        type: String,
        required: true
    })
    link: string;
    
    @Prop({
        type: String,
    })
    image: string;

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tool',
        required: true
    })
    tools: Tool[];

    @Prop({
        type: Boolean,
        default: true
    })
    active: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);