import { Loan } from "src/loans/entities/loan.entity";
import { PaymentMethod } from "src/payment_methods/entities/payment_method.entity";
import { AfterUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    idpayment: string;

    @Column('numeric')
    amount: number;

    @Column('date')
    payment_date: Date;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @ManyToOne(() => Loan, loan => loan.payments)
    loan: Loan;

    @ManyToOne(() => PaymentMethod, payMethod => payMethod.payments)
    payment_method: PaymentMethod;

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
