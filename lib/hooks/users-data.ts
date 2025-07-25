export interface User {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_address: string,
  last_sign_in_at: number,
  banned: boolean,
  locked: boolean,
  created_at: number,
}
export const users = [
  {
    id: "user_1",
    username: "geyang",
    first_name: "Ge",
    last_name: "Yang",
    image_url: "/placeholder.svg?height=40&width=40",
    email_address: "ge.ike.yang@gmail.com",
    last_sign_in_at: 1752127711031,
    banned: false,
    locked: false,
    created_at: 1752095833577,
  },
  {
    id: "user_2",
    username: "janesmith",
    first_name: "Jane",
    last_name: "Smith",
    image_url: "/placeholder.svg?height=40&width=40",
    email_address: "jane@example.com",
    last_sign_in_at: 1752041400000,
    banned: false,
    locked: false,
    created_at: 1751955000000,
  },
  {
    id: "user_3",
    username: "mikejohnson",
    first_name: "Mike",
    last_name: "Johnson",
    image_url: "/placeholder.svg?height=40&width=40",
    email_address: "mike.johnson@example.com",
    last_sign_in_at: 1751987200000,
    banned: true,
    locked: false,
    created_at: 1751900800000,
  },
  {
    id: "user_4",
    username: "sarahwilson",
    first_name: "Sarah",
    last_name: "Wilson",
    image_url: "/placeholder.svg?height=40&width=40",
    email_address: "sarah.wilson@example.com",
    last_sign_in_at: 1752100000000,
    banned: false,
    locked: true,
    created_at: 1751814400000,
  },
  {
    id: "user_5",
    username: "davidbrown",
    first_name: "David",
    last_name: "Brown",
    image_url: "/placeholder.svg?height=40&width=40",
    email_address: "david.brown@example.com",
    last_sign_in_at: 1752086400000,
    banned: false,
    locked: false,
    created_at: 1751728000000,
  },
]
