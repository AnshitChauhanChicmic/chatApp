import { Collection, Document, Filter, UpdateFilter, WithId } from "mongodb";
import { FilterQuery, Model } from "mongoose";

export const dbService = {
    addDataToDb: async <T>(model: Model<T>, data: FilterQuery<T>)
        : Promise<T | null> => {
        return await model.insertOne(data);
    },

    modifyData: async (model: Collection<Document>, query: Filter<Document>, update: UpdateFilter<Document> | Partial<Document>)
        : Promise<void> => {
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

    listTasks: async (model: Collection<Document>, query: Filter<Document>)
        : Promise<WithId<Document>[]> => {
        return await model.find(query).toArray();
    },
};