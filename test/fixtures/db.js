import { rolesScript } from '../../src/config/init';
import { User, Role, Country } from '../../src/database/models';
import redisClient from '../../src/database/redis';
import Protection from '../../src/helpers/encryption';
import { getToken } from '../../src/helpers/token';

const userOnePassword = 'JohnDoe@2022';
const userOne = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    password: Protection.hashPassword(userOnePassword),
    userName: 'AnonymousJoe',
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
};

const adminPassword = 'JaneDoe@2022';
const admin = {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@email.com',
    userName: 'unknown_user',
    password: Protection.hashPassword(adminPassword),
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
};
const managerPassword = process.env.ADMIN_ACCOUNT_PASSWORD;
const manager = {
    id: 3,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@email.com',
    userName: 'JaneDoe',
    password: Protection.hashPassword(managerPassword),
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
};

const countryOne = { name: 'Rwanda' };

const locationOne = { city: 'Kigali' };

const accommodationOne = {
    name: 'Marriott Hotel',
    type: 'Hotel',
    description: 'Best 4 star experience',
    amenities: ['Lobby reception', 'Swimming pool', 'Restaurant'],
    images: [
        'https://res.cloudinary.com/yustogallery/image/upload/v1643336881/samples/landscapes/nature-mountains.jpg',
    ],
    address: 'KN 1 Av',
    geoCoordinates: { longitude: 30.15, latitude: -1.54 },
};

const setupDatabase = async() => {
    await rolesScript();
    const usersData = [admin, manager, userOne];
    await User.bulkCreate(usersData);
    const usersTokens = usersData.map((user) => {
        const tokenObject = getToken({ id: user.id, email: user.email },
            parseInt(process.env.TOKEN_EXPIRE, 10),
            Date.now()
        );
        user.token = tokenObject.token;
        tokenObject.userId = user.id;
        return tokenObject;
    });
    const pipeline = redisClient.pipeline();
    usersTokens.forEach((token) =>
        pipeline.set(
            `${process.env.NODE_ENV}:user-${token.userId}-access-${token.tokenId}`,
            token.token,
            'EX',
            process.env.TOKEN_EXPIRE
        )
    );
    await pipeline.exec((error, result) => {
        if (error) console.log(error);
    });

    const country = await Country.create(countryOne);

    const location = await country.createLocation(locationOne);

    const accommodation = await location.createAccommodation(accommodationOne);
    accommodationOne.id = accommodation.id;
};

const clearDatabase = async() => {
    await User.destroy({ where: {} });
    await Role.destroy({ where: {} });
    await Country.destroy({ where: {} });
    await redisClient.keys(`${process.env.NODE_ENV}:*`, (error, result) => {
        if (error) return error;
        const pipeline = redisClient.pipeline();
        result.forEach((key) => pipeline.del(key));
        return pipeline.exec((err, res) => {
            if (err) return err;
            return res;
        });
    });
};

export {
    userOne,
    userOnePassword,
    admin,
    manager,
    managerPassword,
    accommodationOne,
    setupDatabase,
    clearDatabase,
};