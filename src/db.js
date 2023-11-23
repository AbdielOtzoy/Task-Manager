import mongoose from 'mongoose';
import { PASSWORD_ATLAS } from './config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://abdielo:${PASSWORD_ATLAS}@cluster0.fkurhpr.mongodb.net/merndb` )
        console.log('>>> DB is connected');
    } catch (error) {
        console.log(error);
    }
};