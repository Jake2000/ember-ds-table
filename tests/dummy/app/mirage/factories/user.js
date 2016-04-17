import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    firstName: faker.name.firstName,
    lastName: faker.name.firstName,
    company: faker.company.companyName,
    address: faker.address.streetAddress,
    country: faker.address.country,
    state: faker.address.state,
    email: faker.internet.email,
    username: faker.internet.userName,
    avatar: faker.internet.avatar,
    bio: faker.lorem.paragraph
});
