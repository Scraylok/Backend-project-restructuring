import { findUsers, createUser } from "../services/userService.js";
import { createHash } from "../utils/bcrypt.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }

}

export const createNewUser = async (req, res) => {
    try {
        const user = await createUser(user)
        res.send({ status: "success", message: "User Created Successfully" })
    } catch (error) {
        res.status(500).send(error)
    }
    
}