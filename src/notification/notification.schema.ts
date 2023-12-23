import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({timestamps: true})
export class Notification {
    @Prop({type: String, required: true})
    description: String;

    @Prop({type: String, required: true})
    dataId: ObjectId;

    @Prop({type: Boolean, required: true, default: false})
    alreadySeen: Boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);