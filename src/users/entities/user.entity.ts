import { Client } from "src/clients/entities/client.entity";
import { Loan } from "src/loans/entities/loan.entity";
import { AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    iduser: string;

    @Column('character varying')
    name: string;

    @Column('character varying')
    password: string;

    @Column('character varying', {unique: true})
    email: string;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @OneToMany(() => Loan, loan => loan.lender)
    loans: Loan[];

    @OneToMany(() => Client, cli => cli.lender)
    clients: Client[];

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
