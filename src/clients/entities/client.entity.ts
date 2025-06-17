import { Direction } from "src/directions/entities/direction.entity";
import { Loan } from "src/loans/entities/loan.entity";
import { User } from "src/users/entities/user.entity";
import { AfterUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    idclient: string;

    @Column('character varying')
    name: string;

    @Column('character varying')
    last_name: string;

    @Column('character varying', { nullable: true })
    maternal_last_name?: string;

    @Column('character varying')
    curp: string;

    @Column('date')
    birth_date: Date;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @OneToOne(() => Direction, dir => dir.client, { cascade: true, eager: true })
    @JoinColumn()
    direction: Direction;

    @OneToMany(() => Loan, loan => loan.client)
    loans: Loan[];

    @ManyToOne(() => User, user => user.clients)
    lender: User;

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
