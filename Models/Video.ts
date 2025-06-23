import mongoose, {Schema, model, models} from "mongoose";

export const VideoDimensions  = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformations?: {
        height: number;
        width: number;
        quality?: number;
    };
}

const videoSchema = new Schema<IVideo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    controls: {type: Boolean, default: true},
    transformations: {
        height: {type: Number, default: VideoDimensions.height},
        width: {type: Number, default: VideoDimensions.width},
        quality: {type: Number, min: 1, max: 100, default: 75},
    },
}, {
    timestamps: true,
});

export const Video = models.Video || model<IVideo>("Video", videoSchema);

