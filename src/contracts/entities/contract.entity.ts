import { Loan } from "src/loans/entities/loan.entity";
import { AfterUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    idcontract: string;

    @Column('text')
    link: number;

    @Column('boolean', {default: true})
    status: boolean;

    @Column('uuid')
    userCreated: string;

    @Column('timestamp without time zone', {default: () => 'now()'})
    createAt: Date;

    @Column('timestamp without time zone', {default: () => 'now()'})
    updateAt: Date;

    @OneToOne(() => Loan, loan => loan.contract)
    loan: Loan;

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
