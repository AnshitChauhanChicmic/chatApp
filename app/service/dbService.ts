import { FilterQuery, Model, UpdateQuery } from "mongoose";

export const dbService = {
    addDataToDb: async <T>(model: Model<T>, data: FilterQuery<T>)
        : Promise<T | null> => {
        return await model.insertOne(data);
    },

    modifyData: async <T>(model: Model<T>, query: FilterQuery<T>, update: UpdateQuery<T>)
        : Promise<any> => {
        await model.updateOne(query, update);
    },

    checkDataExistsInDb: async <T>(model: Model<T>, query: FilterQuery<T>)
        : Promise<T | null> => {
        return await model.findOne(query);
    },

    checkTaskExists: async <T>(model: Model<T>, taskId: any)
        : Promise<number> => {
        return await model.countDocuments({ _id: taskId });
    },

    listTasks: async <T>(model: Model<T>, query: FilterQuery<T>)
        : Promise<any> => {
        return await model.find(query);
    },

    findAndUpdate: async <T>(model: Model<T>, query: FilterQuery<T>, update: UpdateQuery<T>)
        : Promise<any> => {
        return await model.findOneAndUpdate(query, update);
    },
};