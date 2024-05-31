import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../user/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  const sexFlag = faker.number.int(1);
  const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';

  user.username = faker.person.firstName(sex);
  user.password = faker.person.lastName(sex);

  return user;
});
