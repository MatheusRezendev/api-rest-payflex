import { UserType } from "./userType";

export type UserProps = {
    id: string;
    nome: string;
    email: string;
    cpf?: string | null;
    cnpj?: string | null;
    senha: string;
    tipo: UserType;
}

export class User {
    private constructor(readonly props: UserProps) {}

    public static build(nome: string, email: string, senha: string, tipo: UserType, cpf?: string, cnpj?: string) {
        // Validação de cpf e cnpj

        return new User({
            id: crypto.randomUUID().toString(),
            nome,
            email,
            senha,
            tipo,
            cpf,
            cnpj
        }) 
    }

    public podeTransferir() {
        return this.props.tipo === UserType.usuario;
    }

    public get id() {
        return this.props.id;
    }

    public get nome() {
        return this.props.nome;
    }

    public get email() {
        return this.props.email;
    }

    public get senha() {
        return this.props.senha;
    }

    public get cpf() {
        return this.props.cpf;
    }

    public get cnpj() {
        return this.props.cnpj;
    }

    public get tipo() {
        return this.props.tipo;
    }


}