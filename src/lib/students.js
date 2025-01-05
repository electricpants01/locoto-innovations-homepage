import { Students } from "./mongodb";

export const getAllStudents = async () => {
    console.log("Getting all students");
    const studentsCollection = await Students();
    const response = await studentsCollection.find({}).limit(5).toArray();
    console.log("Fetched students:", response);
    return response;
};

// getAllStudents().catch(console.error)

export const createStudent = async (newUser) => {
    return await (await Students()).insertOne(newUser);
};