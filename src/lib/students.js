import { StudentsCollection } from "./mongodb";

export const getAllStudents = async (searchQuery = "") => {
    console.log("Getting students with search query:", searchQuery);
    const studentsCollection = await StudentsCollection();

    // If searchQuery is provided, filter students by name
    const query = searchQuery ? {
            $and: searchQuery.split(/\s+/).map(word => ({
                fullName: { $regex: word, $options: "i" }
            }))
        } : {};
    console.log(query);

    const response = await studentsCollection.find(query).limit(30).toArray();
    console.log("Fetched students:", response.length);
    return response;
};

export const createStudent = async (newUser) => {
    return await (await StudentsCollection()).insertOne(newUser);
};