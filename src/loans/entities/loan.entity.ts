import { Client } from "src/clients/entities/client.entity";
import { Contract } from "src/contracts/entities/contract.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { User } from "src/users/entities/user.entity";
import { AfterUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loan {
    @PrimaryGeneratedColumn('uuid')
    idloan: string;

    @Column('numeric')
    amount: number;

    @Column('date')
    start_date: Date;

    @Column('number')
    payment_interval: number;

    @Column('number')
    minimum_payment: number;
    
    @Column('date')
    end_date: Date;
    
    @Column('number')
    interest_rate: number;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @ManyToOne(() => User, user => user.loans)
    lender: User;

    @ManyToOne(() => Client, client => client.loans)
    client: Client;

    @OneToMany(() => Payment, pay => pay.loan)
    payments: Payment[];

    @OneToOne(() => Contract, con => con.loan)
    @JoinColumn()
    contract: Contract;

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
