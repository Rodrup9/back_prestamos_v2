import { Municipality } from "src/municipality/entities/municipality.entity";
import { AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class State {
    @PrimaryGeneratedColumn('uuid')
    idstate: string;

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

    @OneToMany(() => Municipality, mun => mun.state)
    municipalities: Municipality[];

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
