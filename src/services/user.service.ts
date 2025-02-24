import { UserType } from "../entities/userType";

export type CriarUserDto = {
    nome: string;
    email: string;
    senha: string;
    tipo: UserType;
    cpf?: string;
    cnpj?: string
};

export type AtualizarUserDto = {
    nome?: string;
    email?: string;
    senha?: string;
    tipo?: UserType;
}

export type ListarUserDto = {
    id?: string;
    nome: string;
    email: string;
    tipo: UserType;
}

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
    list(filters?: ListarUserDto): Promise<UserResponseDto[]>;
    findById(id: string): Promise<UserResponseDto | null>;
    update(id: string, userDto: AtualizarUserDto): Promise<UserResponseDto>;
    delete(id: string): Promise<void>;    
}