import { Prop, Schema } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Experience {
    @Prop({type: String, required: true})
    title: String;

    @Prop({type: String, required: true})
    description: String;

    @Prop({type: String, required: true})
    companie: String;

    
}