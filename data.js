const ROLE = {
  ADMIN: "admin",
  DRIVER: "driver",
}

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, firstName: "Kyle", lastName: "Smith", role: ROLE.ADMIN },
    { id: 2, firstName: "Sally", lastName: "Rover", role: ROLE.DRIVER },
    { id: 3, firstName: "Joe", lastName: "Apples", role:  ROLE.DRIVER },
  ],
  runs: [
    { id: 1, name: "Brisbane North", userId: 1 },
    { id: 2, name: "Brisbane South", userId: 2 },
    { id: 3, name: "Gold Coast", userId: 3 },
  ],
}
