import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class Rating {
  @Prop({ ref: "users", type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number })
  rating: Number = 0;

  @Prop({ type: String })
  description: string;

  @Prop({
    ref: "products",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  productId: mongoose.Schema.Types.ObjectId;
}

export type RatingDocument = Rating & Document;

export const RatingSchema = SchemaFactory.createForClass(Rating);

export const RATING_MODEL = Rating.name;
