import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column()
  Place: string;
  @Column()
  Rating: number;
  @Column()
  Experience: string;
  @Column()
  start_date: string;
  @Column('varchar', {
    nullable: true,
    array: true,
  })
  Images: string[];
  @Column({
    nullable: true,
  })
  Hotel_name: string;
  @Column({
    nullable: true,
  })
  Hotel_cost: number;
  @Column({
    nullable: true,
  })
  Hotel_refno: string;
  @Column({
    nullable: true,
  })
  Transport_name: string;
  @Column({
    nullable: true,
  })
  Transport_refno: string;
  @Column({
    nullable: true,
  })
  Transport_cost: number;
  @Column()
  Favorite: boolean;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
