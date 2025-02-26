import { User } from "../entities/user";
export interface UserRepository {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}