import { gql } from "@apollo/client";

export const EXPENSE_ADDED_SUBSCRIPTION = gql`
  subscription OnExpenseAdded {
    expenseAdded {
      id
      description
      amount
      category
      createdAt
    }
  }
`;
