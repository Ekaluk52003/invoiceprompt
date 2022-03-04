import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    getMe {
      id
      name
      email
    }
  }
`;
export default function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  if (data) {
    return data?.getMe;
  }
  return !data;
}
export { CURRENT_USER_QUERY };
