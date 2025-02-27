-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipo` ENUM('usuario', 'lojista') NOT NULL,
    `cpf` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    UNIQUE INDEX `usuarios_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carteiras` (
    `id` VARCHAR(191) NOT NULL,
    `saldo` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `carteiras_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transferencias` (
    `id` VARCHAR(191) NOT NULL,
    `idUserEnvia` VARCHAR(191) NOT NULL,
    `idUserRecebe` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `status` ENUM('pendente', 'concluida', 'cancelada') NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carteiras` ADD CONSTRAINT `carteiras_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
