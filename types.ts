export interface Book {
  _id: string
  title: string
  author: string
  amount: number
  price: number
}

export interface Customer {
  _id: string
  firstName: string
  lastName: string
  orders: string[]
  subscribed: boolean
}

export interface Order {
  _id: string
  books: OrderedBook[]
  customerId: string
  totalPrice: number
  cancelled: boolean
}

export interface OrderedBook {
  bookId: string
  amount: number
}
