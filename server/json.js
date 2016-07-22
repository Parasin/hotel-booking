var data = {};

data.users = [
    {
        "email": "test@gmail.com"
        , "password": "abc1234"
        , "firstName": "John"
        , "lastName": "Doe"
        , "dateOfBirth": "10 10 1989"
    }, {
        "email": "test2@gmail.com"
        , "password": "abc1234"
        , "firstName": "Paul"
        , "lastName": "Smith"
        , "dateOfBirth": "10 12 1989"
    }, {
        "email": "test3@gmail.com"
        , "password": "abc1234"
        , "firstName": "Morgan"
        , "lastName": "Weber"
        , "dateOfBirth": "08 26 1990"
    }, {
        "email": "test4@gmail.com"
        , "password": "abc1234"
        , "firstName": "Betsy"
        , "lastName": "Ross"
        , "dateOfBirth": "07 04 1776"
    }, {
        "email": "test5@gmail.com"
        , "password": "abc1234"
        , "firstName": "Peter"
        , "lastName": "Griffin"
        , "dateOfBirth": "01 02 1969"
    }, {
        "email": "test6@gmail.com"
        , "password": "abc1234"
        , "firstName": "Alex"
        , "lastName": "Bechtol"
        , "dateOfBirth": "08 24 1993"
    }, {
        "email": "test7@gmail.com"
        , "password": "abc1234"
        , "firstName": "Melvin"
        , "lastName": "Jones"
        , "dateOfBirth": "09 17 1943"
    }, {
        "email": "test8@gmail.com"
        , "password": "abc1234"
        , "firstName": "Xin"
        , "lastName": "Li"
        , "dateOfBirth": "04 04 1981"
    }, {
        "email": "test9@gmail.com"
        , "password": "abc1234"
        , "firstName": "Sarah"
        , "lastName": "Brown"
        , "dateOfBirth": "02 03 1992"
    }, {
        "email": "test10@gmail.com"
        , "password": "abc1234"
        , "firstName": "Carl"
        , "lastName": "Walker"
        , "dateOfBirth": "03 19 1995"
    }
];

data.hotels = [
    {
        "phoneNo": 9728227070
        , "name": "Chateau Du Morgan"
        , "street": "9916 Promontory Drive"
        , "city": "Havana"
        , "zipcode": 12345
        , "country": "Cuba"
    }, {
        "phoneNo": 1234567890
        , "name": "Marriot"
        , "street": "123 Main Street"
        , "city": "Orlando"
        , "zipcode": 55555
        , "country": "USA"
    }, {
        "phoneNo": 5212516775
        , "name": "Secrets of the Vine"
        , "street": "123 Resort Drive"
        , "city": "Cancun"
        , "zipcode": 65482
        , "country": "Mexico"
    }, {
        "phoneNo": 6842579512
        , "name": "Hard Rock"
        , "street": "8 Homely Place"
        , "city": "Charlotte"
        , "zipcode": 96478
        , "country": "USA"
    }, {
        "phoneNo": 9631478558
        , "name": "La Quinta"
        , "street": "99 First Street"
        , "city": "Hong Kong"
        , "zipcode": 76194
        , "country": "Taiwan"
    }, {
        "phoneNo": 9991586464
        , "name": "Msaquerade"
        , "street": "8789 Alpha Road"
        , "city": "Las Vegas"
        , "zipcode": 45456
        , "country": "USA"
    }, {
        "phoneNo": 1125469789
        , "name": "Beachside"
        , "street": "9159 Courtyard Drive"
        , "city": "Puerto Vallarta"
        , "zipcode": 55555
        , "country": "Mexico"
    }, {
        "phoneNo": 3579512365
        , "name": "Marriot Express"
        , "street": "77 Cumberbatch Road"
        , "city": "Dubai"
        , "zipcode": 85258
        , "country": "UAE"
    }, {
        "phoneNo": 8885465512
        , "name": "Palace Resort"
        , "street": "9987 Resort Street"
        , "city": "Athens"
        , "zipcode": 98712
        , "country": "Greece"
    }, {
        "phoneNo": 4546987532
        , "name": "Hilton Ibiza"
        , "street": "45623 Ibiza Place"
        , "city": "Ibiza"
        , "zipcode": 75458
        , "country": "Ibiza"
    }
    
];

data.rooms = [
    {
        "roomType": "Double Suite"
        , "pricePerNight": 899.99
        , "inService": 1
        , "view": "Skyline"
        , "numBath": 1
        , "numBed": 2
        , "kitchen": 0
        , "hotelId": 1
    }, {
        "roomType": "Double Suite"
        , "pricePerNight": 899.99
        , "inService": 0
        , "view": "Skyline"
        , "numBath": 1
        , "numBed": 2
        , "kitchen": 0
        , "hotelId": 1
    }, {
        "roomType": "Single Suite"
        , "pricePerNight": 299.99
        , "inService": 0
        , "view": "Beachfront"
        , "numBath": 1
        , "numBed": 1
        , "kitchen": 1
        , "hotelId": 2
    }, {
        "roomType": "Single Suite"
        , "pricePerNight": 299.99
        , "inService": 1
        , "view": "Courtyard"
        , "numBath": 1
        , "numBed": 1
        , "kitchen": 1
        , "hotelId": 3
    }, {
        "roomType": "Single Suite"
        , "pricePerNight": 499.99
        , "inService": 1
        , "view": "Skyline"
        , "numBath": 1
        , "numBed": 1
        , "kitchen": 0
        , "hotelId": 4
    }, {
        "roomType": "Honeymoon Suite"
        , "pricePerNight": 899.99
        , "inService": 1
        , "view": "Beachfront"
        , "numBath": 1
        , "numBed": 2
        , "kitchen": 1
        , "hotelId": 7
    }, {
        "roomType": "Presidential Suite"
        , "pricePerNight": 1999.99
        , "inService": 1
        , "view": "Skyline"
        , "numBath": 2
        , "numBed": 3
        , "kitchen": 1
        , "hotelId": 7
    }, {
        "roomType": "Single Suite"
        , "pricePerNight": 399.99
        , "inService": 1
        , "view": "Skyline"
        , "numBath": 1
        , "numBed": 1
        , "kitchen": 0
        , "hotelId": 8
    }, {
        "roomType": "Double Suite"
        , "pricePerNight": 799.99
        , "inService": 1
        , "view": "Beachfront"
        , "numBath": 1
        , "numBed": 2
        , "kitchen": 1
        , "hotelId": 10
    }, {
        "roomType": "Economy Suite"
        , "pricePerNight": 99.99
        , "inService": 1
        , "view": "Courtyard"
        , "numBath": 1
        , "numBed": 1
        , "kitchen": 0
        , "hotelId": 9
    }
];
data.bookings[
    {
        "bookedBy": "Daniel"
        ,"roomNumber": 1
        ,"startDate": "07 22 2016"
        ,"endDate": "07 31 2016"
        ,"availability": "available"
        ,"userId": 1
    },{
        "bookedBy": "Scott"
        ,"roomNumber": 2
        ,"startDate": "07 15 2016"
        ,"endDate": "07 23 2016"
        ,"availability": "available"
        ,"userId": 2
    },{
        "bookedBy": "Jason"
        ,"roomNumber": 3
        ,"startDate": "08 02 2016"
        ,"endDate": "08 07 2016"
        ,"availability": "available"
        ,"userId": 3
    },{
        "bookedBy": "Mathew"
        ,"roomNumber": 4
        ,"startDate": "08 05 2016"
        ,"endDate": "08 10 2016"
        ,"availability": "available"
        ,"userId": 4
    },{
        "bookedBy": "Jessica"
        ,"roomNumber": 5
        ,"startDate": "08 15 2016"
        ,"endDate": "08 22 2016"
        ,"availability": "available"
        ,"userId": 5
    },{
        "bookedBy": "Jane"
        ,"roomNumber": 6
        ,"startDate": "07 28 2016"
        ,"endDate": "08 05 2016"
        ,"availability": "available"
        ,"userId": 6
    },{
        "bookedBy": "Jimmy"
        ,"roomNumber": 7
        ,"startDate": "09 01 2016"
        ,"endDate": "09 06 2016"
        ,"availability": "available"
        ,"userId": 7
    },{
        "bookedBy": "Karen"
        ,"roomNumber": 8
        ,"startDate": "09 15 2016"
        ,"endDate": "09 20 2016"
        ,"availability": "available"
        ,"userId": 8
    },{
        "bookedBy": "John"
        ,"roomNumber": 9
        ,"startDate": "07 23 2016"
        ,"endDate": "08 10 2016"
        ,"availability": "available"
        ,"userId": 9
    },{
        "bookedBy": "Charlotte"
        ,"roomNumber": 10
        ,"startDate": "08 12 2016"
        ,"endDate": "08 18 2016"
        ,"availability": "available"
        ,"userId": 10
    }
];

module.exports = data;