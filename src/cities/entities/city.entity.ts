import { Locality } from "src/localities/entities/locality.entity";
import { Municipality } from "src/municipality/entities/municipality.entity";
import { AfterUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn('uuid')
    idcity: string;

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

    @ManyToOne(() => Municipality, mun => mun.cities)
    municipality: Municipality;

    @OneToMany(() => Locality, loc => loc.city)
    localities: Locality[];

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
