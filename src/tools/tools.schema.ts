import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ToolDocument = HydratedDocument<Tool>;

@Schema({ timestamps: true })
export class Tool {
    @Prop({type: String, required: true})
    title: String;

    @Prop({type: String, required: true})
    image: String;
}

export const ToolSchema = SchemaFactory.createForClass(Tool);