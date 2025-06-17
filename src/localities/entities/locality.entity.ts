import { City } from "src/cities/entities/city.entity";
import { Direction } from "src/directions/entities/direction.entity";
import { AfterUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Locality {
    @PrimaryGeneratedColumn('uuid')
    idlocality: string;

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

    @ManyToOne(() => City, city => city.localities)
    city: City;

    @OneToMany(() => Direction, dir => dir.locality)
    directions: Direction[]

    @AfterUpdate()
    updatedDate() {
        this.updateAt = new Date();
    }
}
