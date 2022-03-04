import gql from "graphql-tag";





export const LOGIN_MUTATION = gql`
mutation login($username:String $password:String  )
 {
  loginUser(username:$username password:$password)
}`


export const GET_ME_QUERY = gql`
query getMe {
  getMe {
      id
      name
      email
    }
  }`

export const CREATE_INVOICE = gql`
mutation createInvoice($items: [ItemInput], $title: String, $TotalAmount: Int, $description: String, $term: Int, $customer: String, $dueDate: String, $status: status, $contactInfo: String) {
  createInvoice(
    items: $items
    title: $title
    TotalAmount: $TotalAmount
    description: $description
    term: $term
    customer: $customer
    contactInfo: $contactInfo
    dueDate: $dueDate
    status: $status
  ) {
    id
    items
    number
    TotalAmount
    status
  }
}`



export const GET_INVOICE_ID = gql`
query findInvoiceById($id:Int) {
 findInvoiceById(id:$id){
  id
  number
  TotalAmount
  term
  title
  description
  dueDate
  createdAt
  items
  customer{
   name
   contactInfo
  }
  user{
   name
  }
  status
 }
}`


export const SUM_INVOICE = gql`
query suminv ($Limit:Int) {
  suminvoices(Limit :$Limit){
  amount
    date

  }
}`

export const UPDATE_INVOICE_ID = gql`
mutation updateInvoice($id:Int
$title:String $TotalAmount:Int
  $items:[ItemInput]
  $term:Int
  $dueDate:String
  $description:String
  $status:status
    $customer:String
  $contactInfo:String
) {
  updateInvoice(id:$id title:$title TotalAmount:$TotalAmount
  term:$term
  dueDate: $dueDate
  description:$description
  status: $status
  customer:$customer
   contactInfo:$contactInfo
  items:
    $items
  )
  {
    number
    title
    TotalAmount
    createdAt
    items
   status
    user{
      name
    }
    customer {
      name
    }
  }
}`


export const FIND_INVOICE = gql`
query findInvoice(
 $where: String
 $fromDate: String
 $toDate: String
 $status: status
 $overdue:Boolean
) {
 findinvoice(
  where: $where
  fromDate: $fromDate
  toDate: $toDate
  status: $status
  overdue:$overdue
 ) {
  id
  number
  title
  username
  name
  status
  TotalAmount
  dueDate
  createdAt
 }
}`


export const SUM_INVOICE_RANGE = gql`
query SumRange ($fromDate:String $toDate:String) {
  SumRange(fromDate:$fromDate toDate:$toDate){
  amount
  }
}`

export const FIND_CUSTOMERS = gql`
query findCustomer ($name:String) {
customers (name:$name){
  contactInfo
  name
}
}`


export const FIND_SINGLE_CUSTOMERS = gql`
query FindSingleCustomer($customerName:String) {
  customerSearch(customerName:$customerName){
    name
    contactInfo
  }
}`

export const FIND_INVOICE_HISTORY = gql`
query findinvoiceHistory($invoiceId:Int) {
  findinvoiceHistory(invoiceId:$invoiceId) {
   description
   createdAt
   user
   invoiceId

  }
 }`