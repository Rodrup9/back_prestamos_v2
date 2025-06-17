import { City } from "src/cities/entities/city.entity";
import { State } from "src/states/entities/state.entity";
import { AfterUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn('uuid')
    idmunicipality: string;

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

    @ManyToOne(() => State, state => state.municipalities)
    state: State;

    @OneToMany(() => City, city => city.municipality)
    cities: City[];

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
