import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: null | typeof mongoose;
        promise: null | Promise<typeof mongoose>;
    };
}
