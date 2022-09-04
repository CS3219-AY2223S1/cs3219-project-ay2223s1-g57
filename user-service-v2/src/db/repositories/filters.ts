// We define commonly needed CRUD queries
// using or ModelInput type definition
// and placing any additional types here
export interface GetAllUsersFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}
