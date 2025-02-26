import { UserType } from "../entities/userType";

export type CriarUserDto = {
    nome: string;
    email: string;
    senha: string;
    tipo: UserType;
    cpf?: string;
    cnpj?: string
};

export type UserResponseDto = {
    id: string;
    nome: string;
    email: string;
    tipo: UserType;
    cpf?: string;
    cnpj?: string
}

export interface UserService {
    save(userDto: CriarUserDto): Promise<UserResponseDto>;
    list(): Promise<UserResponseDto[]>;
    findById(id: string): Promise<UserResponseDto | null>;
    findByEmail(email: string): Promise<UserResponseDto | null>;
    delete(id: string): Promise<void>;    
}