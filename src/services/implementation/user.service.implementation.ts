import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user.repositories";
import {CriarUserDto, UserResponseDto, UserService } from "../user.service";

export class UserServiceImplementation implements UserService{
    private constructor(readonly repository: UserRepository){}

    public static build(repository: UserRepository){
        return new UserServiceImplementation(repository);
    }

    public async save(userDto: CriarUserDto): Promise<UserResponseDto> {
        const userExistente = await this.repository.findByEmail(userDto.email);
        if(userExistente){
            throw new Error("Email ja cadastrado");
        }

        if (userDto.cpf) {
            const cpfExistente = await this.repository.findByCpf(userDto.cpf);
            if (cpfExistente) {
                throw new Error("CPF já cadastrado.");
            }
        }
    
        if (userDto.cnpj) {
            const cnpjExistente = await this.repository.findByCnpj(userDto.cnpj);
            if (cnpjExistente) {
                throw new Error("CNPJ já cadastrado.");
            }
        }

        const user = User.build(userDto.nome, userDto.email, userDto.senha, userDto.tipo, userDto.cpf, userDto.cnpj);
        await this.repository.save(user);

        return this.toResponseDto(user);
    }

    public async list(): Promise<UserResponseDto[]> {
        const users = await this.repository.list();

        return users.map(this.toResponseDto);
    }

    public async findById(id: string): Promise<UserResponseDto | null> {
        const user = await this.repository.findById(id);

        if(!user){
            return null;
        }

        return this.toResponseDto(user);
    }

    public async findByEmail(email: string): Promise<UserResponseDto | null> {
        const user = await this.repository.findByEmail(email);

        if(!user){  
            return null;
        }

        return this.toResponseDto(user);
    }

    public async delete(id: string): Promise<void> {
        const user = await this.repository.findById(id);
        if(!user){
            throw new Error("Usuario nao encontrado.");
        }

        await this.repository.delete(id);
    }

    private toResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            cpf: user.cpf,
            cnpj: user.cnpj
        };
    }
}