import { Payment } from "src/payments/entities/payment.entity";
import { AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    idpayment_method: string;

    @Column('character varying')
    name: string;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @OneToMany(() => Payment, pay => pay.payment_method)
    payments: Payment[];

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
