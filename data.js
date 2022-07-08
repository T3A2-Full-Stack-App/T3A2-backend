const ROLE = {
  ADMIN: "admin",
  DRIVER: "driver",
}

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, firstName: "Kyle", lastName: "Smith", role: ROLE.DRIVER },
    { id: 2, firstName: "Sally", lastName: "Rover", role: ROLE.DRIVER },
    { id: 3, firstName: "Joe", lastName: "Apples", role: ROLE.DRIVER },
    { id: 4, firstName: "Greg", lastName: "Johnson", role:  ROLE.ADMIN },
  ],
  runs: [
    { id: 1, name: "Brisbane North", userId: 1 },
    { id: 2, name: "Brisbane South", userId: 2 },
    { id: 3, name: "Gold Coast", userId: 3 },
  ],
  vehicles: [
    { id: 1, make: 'Ford', model: 'Transit', year: 2018, registration: 'ABC123', userId: 1, kilometers: 220324, nextService: 230000 },
    { id: 2, make: 'Hyundai', model: 'iLoad', year: 2021, registration: 'XYA322', userId: 2, kilometers: 18422, nextService: 25000 },
    { id: 3, make: 'Mercedes', model: 'Sprinter', year: 2012, registration: 'BRR212', userId: 3, kilometers: 420224, nextService: 425000 }
  ]
}
