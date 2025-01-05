import { StudentsCollection } from "./mongodb";

export const getAllStudents = async () => {
    console.log("Getting all students");
    const studentsCollection = await StudentsCollection();
    const response = await studentsCollection.find({}).limit(5).toArray();
    console.log("Fetched students:", response);
    return response;
};

export const createStudent = async (newUser) => {
    return await (await StudentsCollection()).insertOne(newUser);
};