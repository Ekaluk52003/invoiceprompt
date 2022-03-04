// THIS IS A GENERATED FILE, use `yarn codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type CustomerType = {
  __typename?: 'CustomerType';
  contactInfo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GetMeType = {
  __typename?: 'GetMeType';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type InvoiceAmountType = {
  __typename?: 'InvoiceAmountType';
  amount?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['String']>;
};

export type InvoiceHistoryType = {
  __typename?: 'InvoiceHistoryType';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['Int']>;
  user?: Maybe<Scalars['String']>;
};

export type InvoiceType = {
  __typename?: 'InvoiceType';
  TotalAmount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  customer?: Maybe<CustomerType>;
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Maybe<Scalars['JSONObject']>>>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
  term?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
  userId?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type ItemInput = {
  amount?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  qty?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoice: InvoiceType;
  loginUser?: Maybe<Scalars['Boolean']>;
  logoutUser?: Maybe<Scalars['Boolean']>;
  registerUser: UserType;
  updateInvoice: InvoiceType;
};


export type MutationCreateInvoiceArgs = {
  TotalAmount?: InputMaybe<Scalars['Int']>;
  contactInfo?: InputMaybe<Scalars['String']>;
  customer?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  status?: InputMaybe<Status>;
  term?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationLoginUserArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterUserArgs = {
  input?: InputMaybe<RegisterUserInput>;
};


export type MutationUpdateInvoiceArgs = {
  TotalAmount?: InputMaybe<Scalars['Int']>;
  contactInfo?: InputMaybe<Scalars['String']>;
  customer?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  items?: InputMaybe<Array<InputMaybe<ItemInput>>>;
  status?: InputMaybe<Status>;
  term?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  SumRange?: Maybe<InvoiceAmountType>;
  customerSearch?: Maybe<CustomerType>;
  customers?: Maybe<Array<Maybe<CustomerType>>>;
  findInvoiceById?: Maybe<InvoiceType>;
  findinvoice?: Maybe<Array<Maybe<InvoiceType>>>;
  findinvoiceHistory?: Maybe<Array<Maybe<InvoiceHistoryType>>>;
  getMe?: Maybe<GetMeType>;
  invoices?: Maybe<Array<Maybe<InvoiceType>>>;
  suminvoices?: Maybe<Array<Maybe<InvoiceAmountType>>>;
};


export type QuerySumRangeArgs = {
  fromDate?: InputMaybe<Scalars['String']>;
  toDate?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerSearchArgs = {
  customerName?: InputMaybe<Scalars['String']>;
};


export type QueryCustomersArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFindInvoiceByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryFindinvoiceArgs = {
  fromDate?: InputMaybe<Scalars['String']>;
  overdue?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<Status>;
  toDate?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<Scalars['String']>;
};


export type QueryFindinvoiceHistoryArgs = {
  invoiceId?: InputMaybe<Scalars['Int']>;
};


export type QuerySuminvoicesArgs = {
  Limit?: InputMaybe<Scalars['Int']>;
};

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserType = {
  __typename?: 'UserType';
  createdAt?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Maybe<Roles>>>;
  username?: Maybe<Scalars['String']>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Array<InputMaybe<Roles>>>;
  username: Scalars['String'];
};

export enum Status {
  Billed = 'BILLED',
  Cancel = 'CANCEL',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID'
}

export type LoginMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser?: boolean | null | undefined };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe?: { __typename?: 'GetMeType', id?: number | null | undefined, name?: string | null | undefined, email?: string | null | undefined } | null | undefined };

export type CreateInvoiceMutationVariables = Exact<{
  items?: InputMaybe<Array<InputMaybe<ItemInput>> | InputMaybe<ItemInput>>;
  title?: InputMaybe<Scalars['String']>;
  TotalAmount?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['Int']>;
  customer?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  contactInfo?: InputMaybe<Scalars['String']>;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'InvoiceType', id?: number | null | undefined, items?: Array<any | null | undefined> | null | undefined, number?: number | null | undefined, TotalAmount?: number | null | undefined, status?: Status | null | undefined } };

export type FindInvoiceByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type FindInvoiceByIdQuery = { __typename?: 'Query', findInvoiceById?: { __typename?: 'InvoiceType', id?: number | null | undefined, number?: number | null | undefined, TotalAmount?: number | null | undefined, term?: number | null | undefined, title?: string | null | undefined, description?: string | null | undefined, dueDate?: string | null | undefined, createdAt?: string | null | undefined, items?: Array<any | null | undefined> | null | undefined, status?: Status | null | undefined, customer?: { __typename?: 'CustomerType', name?: string | null | undefined, contactInfo?: string | null | undefined } | null | undefined, user?: { __typename?: 'UserType', name?: string | null | undefined } | null | undefined } | null | undefined };

export type SuminvQueryVariables = Exact<{
  Limit?: InputMaybe<Scalars['Int']>;
}>;


export type SuminvQuery = { __typename?: 'Query', suminvoices?: Array<{ __typename?: 'InvoiceAmountType', amount?: number | null | undefined, date?: string | null | undefined } | null | undefined> | null | undefined };

export type UpdateInvoiceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  TotalAmount?: InputMaybe<Scalars['Int']>;
  items?: InputMaybe<Array<InputMaybe<ItemInput>> | InputMaybe<ItemInput>>;
  term?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  customer?: InputMaybe<Scalars['String']>;
  contactInfo?: InputMaybe<Scalars['String']>;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'InvoiceType', number?: number | null | undefined, title?: string | null | undefined, TotalAmount?: number | null | undefined, createdAt?: string | null | undefined, items?: Array<any | null | undefined> | null | undefined, status?: Status | null | undefined, user?: { __typename?: 'UserType', name?: string | null | undefined } | null | undefined, customer?: { __typename?: 'CustomerType', name?: string | null | undefined } | null | undefined } };

export type FindInvoiceQueryVariables = Exact<{
  where?: InputMaybe<Scalars['String']>;
  fromDate?: InputMaybe<Scalars['String']>;
  toDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  overdue?: InputMaybe<Scalars['Boolean']>;
}>;


export type FindInvoiceQuery = { __typename?: 'Query', findinvoice?: Array<{ __typename?: 'InvoiceType', id?: number | null | undefined, number?: number | null | undefined, title?: string | null | undefined, username?: string | null | undefined, name?: string | null | undefined, status?: Status | null | undefined, TotalAmount?: number | null | undefined, dueDate?: string | null | undefined, createdAt?: string | null | undefined } | null | undefined> | null | undefined };

export type SumRangeQueryVariables = Exact<{
  fromDate?: InputMaybe<Scalars['String']>;
  toDate?: InputMaybe<Scalars['String']>;
}>;


export type SumRangeQuery = { __typename?: 'Query', SumRange?: { __typename?: 'InvoiceAmountType', amount?: number | null | undefined } | null | undefined };

export type FindCustomerQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
}>;


export type FindCustomerQuery = { __typename?: 'Query', customers?: Array<{ __typename?: 'CustomerType', contactInfo?: string | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };

export type FindSingleCustomerQueryVariables = Exact<{
  customerName?: InputMaybe<Scalars['String']>;
}>;


export type FindSingleCustomerQuery = { __typename?: 'Query', customerSearch?: { __typename?: 'CustomerType', name?: string | null | undefined, contactInfo?: string | null | undefined } | null | undefined };

export type FindinvoiceHistoryQueryVariables = Exact<{
  invoiceId?: InputMaybe<Scalars['Int']>;
}>;


export type FindinvoiceHistoryQuery = { __typename?: 'Query', findinvoiceHistory?: Array<{ __typename?: 'InvoiceHistoryType', description?: string | null | undefined, createdAt?: string | null | undefined, user?: string | null | undefined, invoiceId?: number | null | undefined } | null | undefined> | null | undefined };


export const LoginDocument = gql`
    mutation login($username: String, $password: String) {
  loginUser(username: $username, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetMeDocument = gql`
    query getMe {
  getMe {
    id
    name
    email
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const CreateInvoiceDocument = gql`
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
}
    `;
export type CreateInvoiceMutationFn = Apollo.MutationFunction<CreateInvoiceMutation, CreateInvoiceMutationVariables>;

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      items: // value for 'items'
 *      title: // value for 'title'
 *      TotalAmount: // value for 'TotalAmount'
 *      description: // value for 'description'
 *      term: // value for 'term'
 *      customer: // value for 'customer'
 *      dueDate: // value for 'dueDate'
 *      status: // value for 'status'
 *      contactInfo: // value for 'contactInfo'
 *   },
 * });
 */
export function useCreateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(CreateInvoiceDocument, options);
      }
export type CreateInvoiceMutationHookResult = ReturnType<typeof useCreateInvoiceMutation>;
export type CreateInvoiceMutationResult = Apollo.MutationResult<CreateInvoiceMutation>;
export type CreateInvoiceMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const FindInvoiceByIdDocument = gql`
    query findInvoiceById($id: Int) {
  findInvoiceById(id: $id) {
    id
    number
    TotalAmount
    term
    title
    description
    dueDate
    createdAt
    items
    customer {
      name
      contactInfo
    }
    user {
      name
    }
    status
  }
}
    `;

/**
 * __useFindInvoiceByIdQuery__
 *
 * To run a query within a React component, call `useFindInvoiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindInvoiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindInvoiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindInvoiceByIdQuery(baseOptions?: Apollo.QueryHookOptions<FindInvoiceByIdQuery, FindInvoiceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindInvoiceByIdQuery, FindInvoiceByIdQueryVariables>(FindInvoiceByIdDocument, options);
      }
export function useFindInvoiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindInvoiceByIdQuery, FindInvoiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindInvoiceByIdQuery, FindInvoiceByIdQueryVariables>(FindInvoiceByIdDocument, options);
        }
export type FindInvoiceByIdQueryHookResult = ReturnType<typeof useFindInvoiceByIdQuery>;
export type FindInvoiceByIdLazyQueryHookResult = ReturnType<typeof useFindInvoiceByIdLazyQuery>;
export type FindInvoiceByIdQueryResult = Apollo.QueryResult<FindInvoiceByIdQuery, FindInvoiceByIdQueryVariables>;
export const SuminvDocument = gql`
    query suminv($Limit: Int) {
  suminvoices(Limit: $Limit) {
    amount
    date
  }
}
    `;

/**
 * __useSuminvQuery__
 *
 * To run a query within a React component, call `useSuminvQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuminvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuminvQuery({
 *   variables: {
 *      Limit: // value for 'Limit'
 *   },
 * });
 */
export function useSuminvQuery(baseOptions?: Apollo.QueryHookOptions<SuminvQuery, SuminvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuminvQuery, SuminvQueryVariables>(SuminvDocument, options);
      }
export function useSuminvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuminvQuery, SuminvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuminvQuery, SuminvQueryVariables>(SuminvDocument, options);
        }
export type SuminvQueryHookResult = ReturnType<typeof useSuminvQuery>;
export type SuminvLazyQueryHookResult = ReturnType<typeof useSuminvLazyQuery>;
export type SuminvQueryResult = Apollo.QueryResult<SuminvQuery, SuminvQueryVariables>;
export const UpdateInvoiceDocument = gql`
    mutation updateInvoice($id: Int, $title: String, $TotalAmount: Int, $items: [ItemInput], $term: Int, $dueDate: String, $description: String, $status: status, $customer: String, $contactInfo: String) {
  updateInvoice(
    id: $id
    title: $title
    TotalAmount: $TotalAmount
    term: $term
    dueDate: $dueDate
    description: $description
    status: $status
    customer: $customer
    contactInfo: $contactInfo
    items: $items
  ) {
    number
    title
    TotalAmount
    createdAt
    items
    status
    user {
      name
    }
    customer {
      name
    }
  }
}
    `;
export type UpdateInvoiceMutationFn = Apollo.MutationFunction<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;

/**
 * __useUpdateInvoiceMutation__
 *
 * To run a mutation, you first call `useUpdateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvoiceMutation, { data, loading, error }] = useUpdateInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      TotalAmount: // value for 'TotalAmount'
 *      items: // value for 'items'
 *      term: // value for 'term'
 *      dueDate: // value for 'dueDate'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *      customer: // value for 'customer'
 *      contactInfo: // value for 'contactInfo'
 *   },
 * });
 */
export function useUpdateInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>(UpdateInvoiceDocument, options);
      }
export type UpdateInvoiceMutationHookResult = ReturnType<typeof useUpdateInvoiceMutation>;
export type UpdateInvoiceMutationResult = Apollo.MutationResult<UpdateInvoiceMutation>;
export type UpdateInvoiceMutationOptions = Apollo.BaseMutationOptions<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const FindInvoiceDocument = gql`
    query findInvoice($where: String, $fromDate: String, $toDate: String, $status: status, $overdue: Boolean) {
  findinvoice(
    where: $where
    fromDate: $fromDate
    toDate: $toDate
    status: $status
    overdue: $overdue
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
}
    `;

/**
 * __useFindInvoiceQuery__
 *
 * To run a query within a React component, call `useFindInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindInvoiceQuery({
 *   variables: {
 *      where: // value for 'where'
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *      status: // value for 'status'
 *      overdue: // value for 'overdue'
 *   },
 * });
 */
export function useFindInvoiceQuery(baseOptions?: Apollo.QueryHookOptions<FindInvoiceQuery, FindInvoiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindInvoiceQuery, FindInvoiceQueryVariables>(FindInvoiceDocument, options);
      }
export function useFindInvoiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindInvoiceQuery, FindInvoiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindInvoiceQuery, FindInvoiceQueryVariables>(FindInvoiceDocument, options);
        }
export type FindInvoiceQueryHookResult = ReturnType<typeof useFindInvoiceQuery>;
export type FindInvoiceLazyQueryHookResult = ReturnType<typeof useFindInvoiceLazyQuery>;
export type FindInvoiceQueryResult = Apollo.QueryResult<FindInvoiceQuery, FindInvoiceQueryVariables>;
export const SumRangeDocument = gql`
    query SumRange($fromDate: String, $toDate: String) {
  SumRange(fromDate: $fromDate, toDate: $toDate) {
    amount
  }
}
    `;

/**
 * __useSumRangeQuery__
 *
 * To run a query within a React component, call `useSumRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSumRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSumRangeQuery({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useSumRangeQuery(baseOptions?: Apollo.QueryHookOptions<SumRangeQuery, SumRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SumRangeQuery, SumRangeQueryVariables>(SumRangeDocument, options);
      }
export function useSumRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SumRangeQuery, SumRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SumRangeQuery, SumRangeQueryVariables>(SumRangeDocument, options);
        }
export type SumRangeQueryHookResult = ReturnType<typeof useSumRangeQuery>;
export type SumRangeLazyQueryHookResult = ReturnType<typeof useSumRangeLazyQuery>;
export type SumRangeQueryResult = Apollo.QueryResult<SumRangeQuery, SumRangeQueryVariables>;
export const FindCustomerDocument = gql`
    query findCustomer($name: String) {
  customers(name: $name) {
    contactInfo
    name
  }
}
    `;

/**
 * __useFindCustomerQuery__
 *
 * To run a query within a React component, call `useFindCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCustomerQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFindCustomerQuery(baseOptions?: Apollo.QueryHookOptions<FindCustomerQuery, FindCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCustomerQuery, FindCustomerQueryVariables>(FindCustomerDocument, options);
      }
export function useFindCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCustomerQuery, FindCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCustomerQuery, FindCustomerQueryVariables>(FindCustomerDocument, options);
        }
export type FindCustomerQueryHookResult = ReturnType<typeof useFindCustomerQuery>;
export type FindCustomerLazyQueryHookResult = ReturnType<typeof useFindCustomerLazyQuery>;
export type FindCustomerQueryResult = Apollo.QueryResult<FindCustomerQuery, FindCustomerQueryVariables>;
export const FindSingleCustomerDocument = gql`
    query FindSingleCustomer($customerName: String) {
  customerSearch(customerName: $customerName) {
    name
    contactInfo
  }
}
    `;

/**
 * __useFindSingleCustomerQuery__
 *
 * To run a query within a React component, call `useFindSingleCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSingleCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSingleCustomerQuery({
 *   variables: {
 *      customerName: // value for 'customerName'
 *   },
 * });
 */
export function useFindSingleCustomerQuery(baseOptions?: Apollo.QueryHookOptions<FindSingleCustomerQuery, FindSingleCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSingleCustomerQuery, FindSingleCustomerQueryVariables>(FindSingleCustomerDocument, options);
      }
export function useFindSingleCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSingleCustomerQuery, FindSingleCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSingleCustomerQuery, FindSingleCustomerQueryVariables>(FindSingleCustomerDocument, options);
        }
export type FindSingleCustomerQueryHookResult = ReturnType<typeof useFindSingleCustomerQuery>;
export type FindSingleCustomerLazyQueryHookResult = ReturnType<typeof useFindSingleCustomerLazyQuery>;
export type FindSingleCustomerQueryResult = Apollo.QueryResult<FindSingleCustomerQuery, FindSingleCustomerQueryVariables>;
export const FindinvoiceHistoryDocument = gql`
    query findinvoiceHistory($invoiceId: Int) {
  findinvoiceHistory(invoiceId: $invoiceId) {
    description
    createdAt
    user
    invoiceId
  }
}
    `;

/**
 * __useFindinvoiceHistoryQuery__
 *
 * To run a query within a React component, call `useFindinvoiceHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindinvoiceHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindinvoiceHistoryQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useFindinvoiceHistoryQuery(baseOptions?: Apollo.QueryHookOptions<FindinvoiceHistoryQuery, FindinvoiceHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindinvoiceHistoryQuery, FindinvoiceHistoryQueryVariables>(FindinvoiceHistoryDocument, options);
      }
export function useFindinvoiceHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindinvoiceHistoryQuery, FindinvoiceHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindinvoiceHistoryQuery, FindinvoiceHistoryQueryVariables>(FindinvoiceHistoryDocument, options);
        }
export type FindinvoiceHistoryQueryHookResult = ReturnType<typeof useFindinvoiceHistoryQuery>;
export type FindinvoiceHistoryLazyQueryHookResult = ReturnType<typeof useFindinvoiceHistoryLazyQuery>;
export type FindinvoiceHistoryQueryResult = Apollo.QueryResult<FindinvoiceHistoryQuery, FindinvoiceHistoryQueryVariables>;