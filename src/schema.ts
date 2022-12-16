export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  Bytes: any;
  Date: any;
  File: any;
  Object: any;
  Upload: any;
};

/** Current access control list of the current object. */
export type Acl = {
  __typename?: 'ACL';
  /** Public access control list. */
  public?: Maybe<PublicAcl>;
  /** Access control list for roles. */
  roles?: Maybe<Array<RoleAcl>>;
  /** Access control list for users. */
  users?: Maybe<Array<UserAcl>>;
};

/** Allow to manage access rights. If not provided object will be publicly readable and writable */
export type AclInput = {
  /** Public access control list. */
  public?: InputMaybe<PublicAclInput>;
  /** Access control list for roles. */
  roles?: InputMaybe<Array<RoleAclInput>>;
  /** Access control list for users. */
  users?: InputMaybe<Array<UserAclInput>>;
};

/** Use Inline Fragment on Array to get results: https://graphql.org/learn/queries/#inline-fragments */
export type ArrayResult = Client | Element | Employee | Employee_Procedure | Financal | Procedure | Role | Salon | Schedule | Schedule_Procedure | Session | User | Videos | Videos_Categories;

/** The ArrayWhereInput input type is used in operations that involve filtering objects by a field of type Array. */
export type ArrayWhereInput = {
  /** This is the containedBy operator to specify a constraint to select the objects where the values of an array field is contained by another specified array. */
  containedBy?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the contains operator to specify a constraint to select the objects where the values of an array field contain all elements of another specified array. */
  contains?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Any']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Any']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Any']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The BooleanWhereInput input type is used in operations that involve filtering objects by a field of type Boolean. */
export type BooleanWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The BoxInput type is used to specifiy a box operation on a within geo query. */
export type BoxInput = {
  /** This is the bottom left coordinates of the box. */
  bottomLeft: GeoPointInput;
  /** This is the upper right coordinates of the box. */
  upperRight: GeoPointInput;
};

/** The BytesWhereInput input type is used in operations that involve filtering objects by a field of type Bytes. */
export type BytesWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Bytes']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Bytes']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Bytes']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Bytes']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

export type CallCloudCodeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the function to be called. */
  functionName: CloudCodeFunction;
  /** These are the params to be passed to the function. */
  params?: InputMaybe<Scalars['Object']>;
};

export type CallCloudCodePayload = {
  __typename?: 'CallCloudCodePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the result value of the cloud code function execution. */
  result?: Maybe<Scalars['Any']>;
};

/** The CenterSphereInput type is used to specifiy a centerSphere operation on a geoWithin query. */
export type CenterSphereInput = {
  /** This is the center of the sphere. */
  center: GeoPointInput;
  /** This is the radius of the sphere. */
  distance: Scalars['Float'];
};

/** The Class type is used to return the information about an object class. */
export type Class = {
  __typename?: 'Class';
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields: Array<SchemaField>;
};

/** The Client object type is used in operations that involve outputting objects of Client class. */
export type Client = Node & ParseObject & {
  __typename?: 'Client';
  ACL: Acl;
  /** This is the object birthdate. */
  birthdate?: Maybe<Scalars['String']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object email. */
  email?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object salon_id. */
  salon_id?: Maybe<Salon>;
  /** This is the object tel. */
  tel?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type ClientConnection = {
  __typename?: 'ClientConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ClientEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ClientEdge = {
  __typename?: 'ClientEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Client>;
};

/** The ClientOrder input type is used when sorting objects of the Client class. */
export enum ClientOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  BirthdateAsc = 'birthdate_ASC',
  BirthdateDesc = 'birthdate_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  SalonIdAsc = 'salon_id_ASC',
  SalonIdDesc = 'salon_id_DESC',
  TelAsc = 'tel_ASC',
  TelDesc = 'tel_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Client class. */
export type ClientPointerInput = {
  /** Create and link an object from Client class. */
  createAndLink?: InputMaybe<CreateClientFieldsInput>;
  /** Link an existing object from Client class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Client class into a relation field. */
export type ClientRelationInput = {
  /** Add existing objects from the Client class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Client class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateClientFieldsInput>>;
  /** Remove existing objects from the Client class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The ClientRelationWhereInput input type is used in operations that involve filtering objects of Client class. */
export type ClientRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<ClientWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<ClientWhereInput>;
};

/** The ClientWhereInput input type is used in operations that involve filtering objects of Client class. */
export type ClientWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<ClientWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<ClientWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<ClientWhereInput>>;
  /** This is the object birthdate. */
  birthdate?: InputMaybe<StringWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object email. */
  email?: InputMaybe<StringWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonRelationWhereInput>;
  /** This is the object tel. */
  tel?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The CloudCodeFunction enum type contains a list of all available cloud code functions. */
export enum CloudCodeFunction {
  Signin = 'signin',
  Signup = 'signup'
}

export type CreateClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields?: InputMaybe<SchemaFieldsInput>;
};

export type CreateClassPayload = {
  __typename?: 'CreateClassPayload';
  /** This is the created class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The CreateClientFieldsInput input type is used in operations that involve creation of objects in the Client class. */
export type CreateClientFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object birthdate. */
  birthdate?: InputMaybe<Scalars['String']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object tel. */
  tel?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateClientFieldsInput>;
};

export type CreateClientPayload = {
  __typename?: 'CreateClientPayload';
  /** This is the created object. */
  client: Client;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The CreateEmployeeFieldsInput input type is used in operations that involve creation of objects in the Employee class. */
export type CreateEmployeeFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object can_access_salon. */
  can_access_salon?: InputMaybe<Scalars['Boolean']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object tel. */
  tel?: InputMaybe<Scalars['String']>;
};

export type CreateEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateEmployeeFieldsInput>;
};

export type CreateEmployeePayload = {
  __typename?: 'CreateEmployeePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  employee: Employee;
};

/** The CreateEmployee_procedureFieldsInput input type is used in operations that involve creation of objects in the Employee_procedure class. */
export type CreateEmployee_ProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object employee_id. */
  employee_id: EmployeePointerInput;
  /** This is the object procedure_id. */
  procedure_id: ProcedurePointerInput;
};

export type CreateEmployee_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateEmployee_ProcedureFieldsInput>;
};

export type CreateEmployee_ProcedurePayload = {
  __typename?: 'CreateEmployee_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  employee_procedure: Employee_Procedure;
};

export type CreateFileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the new file to be created and uploaded. */
  upload: Scalars['Upload'];
};

export type CreateFilePayload = {
  __typename?: 'CreateFilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created file info. */
  fileInfo: FileInfo;
};

/** The CreateFinancalFieldsInput input type is used in operations that involve creation of objects in the Financal class. */
export type CreateFinancalFieldsInput = {
  ACL?: InputMaybe<AclInput>;
};

export type CreateFinancalInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateFinancalFieldsInput>;
};

export type CreateFinancalPayload = {
  __typename?: 'CreateFinancalPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  financal: Financal;
};

/** The CreateProcedureFieldsInput input type is used in operations that involve creation of objects in the Procedure class. */
export type CreateProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object commission_percentage. */
  commission_percentage?: InputMaybe<Scalars['Float']>;
  /** This is the object commission_value. */
  commission_value?: InputMaybe<Scalars['Float']>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object maintenance_days. */
  maintenance_days?: InputMaybe<Scalars['Float']>;
  /** This is the object maintenance_value. */
  maintenance_value?: InputMaybe<Scalars['Float']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object time. */
  time?: InputMaybe<Scalars['Float']>;
  /** This is the object value. */
  value?: InputMaybe<Scalars['Float']>;
};

export type CreateProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateProcedureFieldsInput>;
};

export type CreateProcedurePayload = {
  __typename?: 'CreateProcedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  procedure: Procedure;
};

/** The CreateRoleFieldsInput input type is used in operations that involve creation of objects in the Role class. */
export type CreateRoleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationInput>;
};

export type CreateRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateRoleFieldsInput>;
};

export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  role: Role;
};

/** The CreateSalonFieldsInput input type is used in operations that involve creation of objects in the Salon class. */
export type CreateSalonFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
};

export type CreateSalonInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateSalonFieldsInput>;
};

export type CreateSalonPayload = {
  __typename?: 'CreateSalonPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  salon: Salon;
};

/** The CreateScheduleFieldsInput input type is used in operations that involve creation of objects in the Schedule class. */
export type CreateScheduleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object accomplished_schedule. */
  accomplished_schedule?: InputMaybe<Scalars['Boolean']>;
  /** This is the object analyzed_schedule. */
  analyzed_schedule?: InputMaybe<Scalars['Boolean']>;
  /** This is the object client_id. */
  client_id?: InputMaybe<ClientPointerInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object schedule_date. */
  schedule_date?: InputMaybe<Scalars['String']>;
};

export type CreateScheduleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateScheduleFieldsInput>;
};

export type CreateSchedulePayload = {
  __typename?: 'CreateSchedulePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  schedule: Schedule;
};

/** The CreateSchedule_procedureFieldsInput input type is used in operations that involve creation of objects in the Schedule_procedure class. */
export type CreateSchedule_ProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object procedure_end_date. */
  procedure_end_date?: InputMaybe<Scalars['String']>;
  /** This is the object procedure_id. */
  procedure_id?: InputMaybe<ProcedurePointerInput>;
  /** This is the object procedure_start_date. */
  procedure_start_date?: InputMaybe<Scalars['String']>;
  /** This is the object schedule_id. */
  schedule_id?: InputMaybe<SchedulePointerInput>;
};

export type CreateSchedule_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateSchedule_ProcedureFieldsInput>;
};

export type CreateSchedule_ProcedurePayload = {
  __typename?: 'CreateSchedule_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  schedule_procedure: Schedule_Procedure;
};

/** The CreateSessionFieldsInput input type is used in operations that involve creation of objects in the Session class. */
export type CreateSessionFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<Scalars['Date']>;
  /** This is the object installationId. */
  installationId?: InputMaybe<Scalars['String']>;
  /** This is the object restricted. */
  restricted?: InputMaybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<Scalars['String']>;
  /** This is the object user. */
  user?: InputMaybe<UserPointerInput>;
};

export type CreateSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateSessionFieldsInput>;
};

export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  session: Session;
};

/** The CreateUserFieldsInput input type is used in operations that involve creation of objects in the User class. */
export type CreateUserFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object acc_type. */
  acc_type: Scalars['String'];
  /** This is the object authData. */
  authData?: InputMaybe<Scalars['Object']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object first_access. */
  first_access: Scalars['Boolean'];
  /** This is the object password. */
  password: Scalars['String'];
  /** This is the object username. */
  username: Scalars['String'];
};

export type CreateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateUserFieldsInput>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  user: User;
};

/** The CreateVideosFieldsInput input type is used in operations that involve creation of objects in the Videos class. */
export type CreateVideosFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object category_id. */
  category_id: Videos_CategoriesPointerInput;
  /** This is the object description. */
  description: Scalars['String'];
  /** This is the object id_ref. */
  id_ref: Scalars['String'];
  /** This is the object mandatory_inputs. */
  mandatory_inputs?: InputMaybe<Scalars['String']>;
  /** This is the object name. */
  name: Scalars['String'];
  /** This is the object video. */
  video: FileInput;
};

export type CreateVideosInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateVideosFieldsInput>;
};

export type CreateVideosPayload = {
  __typename?: 'CreateVideosPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  videos: Videos;
};

/** The CreateVideos_categoriesFieldsInput input type is used in operations that involve creation of objects in the Videos_categories class. */
export type CreateVideos_CategoriesFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object active. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** This is the object name. */
  name: Scalars['String'];
};

export type CreateVideos_CategoriesInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateVideos_CategoriesFieldsInput>;
};

export type CreateVideos_CategoriesPayload = {
  __typename?: 'CreateVideos_categoriesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  videos_categories: Videos_Categories;
};

/** The DateWhereInput input type is used in operations that involve filtering objects by a field of type Date. */
export type DateWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Date']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Date']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Date']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

export type DeleteClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
};

export type DeleteClassPayload = {
  __typename?: 'DeleteClassPayload';
  /** This is the deleted class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteClientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteClientPayload = {
  __typename?: 'DeleteClientPayload';
  /** This is the deleted object. */
  client: Client;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteEmployeePayload = {
  __typename?: 'DeleteEmployeePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  employee: Employee;
};

export type DeleteEmployee_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteEmployee_ProcedurePayload = {
  __typename?: 'DeleteEmployee_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  employee_procedure: Employee_Procedure;
};

export type DeleteFinancalInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteFinancalPayload = {
  __typename?: 'DeleteFinancalPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  financal: Financal;
};

export type DeleteProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteProcedurePayload = {
  __typename?: 'DeleteProcedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  procedure: Procedure;
};

export type DeleteRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  role: Role;
};

export type DeleteSalonInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteSalonPayload = {
  __typename?: 'DeleteSalonPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  salon: Salon;
};

export type DeleteScheduleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteSchedulePayload = {
  __typename?: 'DeleteSchedulePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  schedule: Schedule;
};

export type DeleteSchedule_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteSchedule_ProcedurePayload = {
  __typename?: 'DeleteSchedule_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  schedule_procedure: Schedule_Procedure;
};

export type DeleteSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  session: Session;
};

export type DeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  user: User;
};

export type DeleteVideosInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteVideosPayload = {
  __typename?: 'DeleteVideosPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  videos: Videos;
};

export type DeleteVideos_CategoriesInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteVideos_CategoriesPayload = {
  __typename?: 'DeleteVideos_categoriesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  videos_categories: Videos_Categories;
};

/** The Element object type is used to return array items' value. */
export type Element = {
  __typename?: 'Element';
  /** Return the value of the element in the array */
  value: Scalars['Any'];
};

/** The Employee object type is used in operations that involve outputting objects of Employee class. */
export type Employee = Node & ParseObject & {
  __typename?: 'Employee';
  ACL: Acl;
  /** This is the object can_access_salon. */
  can_access_salon?: Maybe<Scalars['Boolean']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object salon_id. */
  salon_id?: Maybe<Salon>;
  /** This is the object tel. */
  tel?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type EmployeeConnection = {
  __typename?: 'EmployeeConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EmployeeEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EmployeeEdge = {
  __typename?: 'EmployeeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Employee>;
};

/** The EmployeeOrder input type is used when sorting objects of the Employee class. */
export enum EmployeeOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CanAccessSalonAsc = 'can_access_salon_ASC',
  CanAccessSalonDesc = 'can_access_salon_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  SalonIdAsc = 'salon_id_ASC',
  SalonIdDesc = 'salon_id_DESC',
  TelAsc = 'tel_ASC',
  TelDesc = 'tel_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Employee class. */
export type EmployeePointerInput = {
  /** Create and link an object from Employee class. */
  createAndLink?: InputMaybe<CreateEmployeeFieldsInput>;
  /** Link an existing object from Employee class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Employee class into a relation field. */
export type EmployeeRelationInput = {
  /** Add existing objects from the Employee class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Employee class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateEmployeeFieldsInput>>;
  /** Remove existing objects from the Employee class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The EmployeeRelationWhereInput input type is used in operations that involve filtering objects of Employee class. */
export type EmployeeRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<EmployeeWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<EmployeeWhereInput>;
};

/** The EmployeeWhereInput input type is used in operations that involve filtering objects of Employee class. */
export type EmployeeWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<EmployeeWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<EmployeeWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<EmployeeWhereInput>>;
  /** This is the object can_access_salon. */
  can_access_salon?: InputMaybe<BooleanWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonRelationWhereInput>;
  /** This is the object tel. */
  tel?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The Employee_procedure object type is used in operations that involve outputting objects of Employee_procedure class. */
export type Employee_Procedure = Node & ParseObject & {
  __typename?: 'Employee_procedure';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object employee_id. */
  employee_id: Employee;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object procedure_id. */
  procedure_id: Procedure;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type Employee_ProcedureConnection = {
  __typename?: 'Employee_procedureConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<Employee_ProcedureEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type Employee_ProcedureEdge = {
  __typename?: 'Employee_procedureEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Employee_Procedure>;
};

/** The Employee_procedureOrder input type is used when sorting objects of the Employee_procedure class. */
export enum Employee_ProcedureOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmployeeIdAsc = 'employee_id_ASC',
  EmployeeIdDesc = 'employee_id_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  ProcedureIdAsc = 'procedure_id_ASC',
  ProcedureIdDesc = 'procedure_id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Employee_procedure class. */
export type Employee_ProcedurePointerInput = {
  /** Create and link an object from Employee_procedure class. */
  createAndLink?: InputMaybe<CreateEmployee_ProcedureFieldsInput>;
  /** Link an existing object from Employee_procedure class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Employee_procedure class into a relation field. */
export type Employee_ProcedureRelationInput = {
  /** Add existing objects from the Employee_procedure class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Employee_procedure class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateEmployee_ProcedureFieldsInput>>;
  /** Remove existing objects from the Employee_procedure class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The Employee_procedureRelationWhereInput input type is used in operations that involve filtering objects of Employee_procedure class. */
export type Employee_ProcedureRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<Employee_ProcedureWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<Employee_ProcedureWhereInput>;
};

/** The Employee_procedureWhereInput input type is used in operations that involve filtering objects of Employee_procedure class. */
export type Employee_ProcedureWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<Employee_ProcedureWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<Employee_ProcedureWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<Employee_ProcedureWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeeRelationWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object procedure_id. */
  procedure_id?: InputMaybe<ProcedureRelationWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The FileInfo object type is used to return the information about files. */
export type FileInfo = {
  __typename?: 'FileInfo';
  /** This is the file name. */
  name: Scalars['String'];
  /** This is the url in which the file can be downloaded. */
  url: Scalars['String'];
};

export type FileInput = {
  /** A File Scalar can be an url or a FileInfo object. If this field is set to null the file will be unlinked. */
  file?: InputMaybe<Scalars['File']>;
  /** Use this field if you want to unlink the file (the file will not be deleted on cloud storage) */
  unlink?: InputMaybe<Scalars['Boolean']>;
  /** Use this field if you want to create a new file. */
  upload?: InputMaybe<Scalars['Upload']>;
};

/** The FileWhereInput input type is used in operations that involve filtering objects by a field of type File. */
export type FileWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['File']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['File']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['File']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['File']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the matchesRegex operator to specify a constraint to select the objects where the value of a field matches a specified regular expression. */
  matchesRegex?: InputMaybe<Scalars['String']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['File']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
  /** This is the options operator to specify optional flags (such as "i" and "m") to be added to a matchesRegex operation in the same set of constraints. */
  options?: InputMaybe<Scalars['String']>;
};

/** The Financal object type is used in operations that involve outputting objects of Financal class. */
export type Financal = Node & ParseObject & {
  __typename?: 'Financal';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type FinancalConnection = {
  __typename?: 'FinancalConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FinancalEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type FinancalEdge = {
  __typename?: 'FinancalEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Financal>;
};

/** The FinancalOrder input type is used when sorting objects of the Financal class. */
export enum FinancalOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Financal class. */
export type FinancalPointerInput = {
  /** Create and link an object from Financal class. */
  createAndLink?: InputMaybe<CreateFinancalFieldsInput>;
  /** Link an existing object from Financal class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Financal class into a relation field. */
export type FinancalRelationInput = {
  /** Add existing objects from the Financal class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Financal class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateFinancalFieldsInput>>;
  /** Remove existing objects from the Financal class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The FinancalRelationWhereInput input type is used in operations that involve filtering objects of Financal class. */
export type FinancalRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<FinancalWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<FinancalWhereInput>;
};

/** The FinancalWhereInput input type is used in operations that involve filtering objects of Financal class. */
export type FinancalWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<FinancalWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<FinancalWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<FinancalWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The GeoIntersectsInput type is used to specify a geoIntersects operation on a constraint. */
export type GeoIntersectsInput = {
  /** This is the point to be specified. */
  point?: InputMaybe<GeoPointInput>;
};

/** The GeoPoint object type is used to return the information about geo point fields. */
export type GeoPoint = {
  __typename?: 'GeoPoint';
  /** This is the latitude. */
  latitude: Scalars['Float'];
  /** This is the longitude. */
  longitude: Scalars['Float'];
};

/** The GeoPointInput type is used in operations that involve inputting fields of type geo point. */
export type GeoPointInput = {
  /** This is the latitude. */
  latitude: Scalars['Float'];
  /** This is the longitude. */
  longitude: Scalars['Float'];
};

/** The GeoPointWhereInput input type is used in operations that involve filtering objects by a field of type GeoPoint. */
export type GeoPointWhereInput = {
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the geoWithin operator to specify a constraint to select the objects where the values of a geo point field is within a specified polygon or sphere. */
  geoWithin?: InputMaybe<GeoWithinInput>;
  /** This is the maxDistance operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in radians) from the geo point specified in the $nearSphere operator. */
  maxDistance?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInKilometers operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in kilometers) from the geo point specified in the $nearSphere operator. */
  maxDistanceInKilometers?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInMiles operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in miles) from the geo point specified in the $nearSphere operator. */
  maxDistanceInMiles?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInRadians operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in radians) from the geo point specified in the $nearSphere operator. */
  maxDistanceInRadians?: InputMaybe<Scalars['Float']>;
  /** This is the nearSphere operator to specify a constraint to select the objects where the values of a geo point field is near to another geo point. */
  nearSphere?: InputMaybe<GeoPointInput>;
  /** This is the within operator to specify a constraint to select the objects where the values of a geo point field is within a specified box. */
  within?: InputMaybe<WithinInput>;
};

/** The GeoWithinInput type is used to specify a geoWithin operation on a constraint. */
export type GeoWithinInput = {
  /** This is the sphere to be specified. */
  centerSphere?: InputMaybe<CenterSphereInput>;
  /** This is the polygon to be specified. */
  polygon?: InputMaybe<Array<GeoPointInput>>;
};

/** The IdWhereInput input type is used in operations that involve filtering objects by an id. */
export type IdWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['ID']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['ID']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['ID']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** An entry from an object, i.e., a pair of key and value. */
export type KeyValueInput = {
  /** The key used to retrieve the value of this entry. */
  key: Scalars['String'];
  /** The value of the entry. Could be any type of scalar data. */
  value: Scalars['Any'];
};

export type LogInInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the password used to log in the user. */
  password: Scalars['String'];
  /** This is the username used to log in the user. */
  username: Scalars['String'];
};

export type LogInPayload = {
  __typename?: 'LogInPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the existing user that was logged in and returned as a viewer. */
  viewer: Viewer;
};

export type LogInWithInput = {
  authData: Scalars['Object'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<UserLoginWithInput>;
};

export type LogInWithPayload = {
  __typename?: 'LogInWithPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the new user that was created, signed up and returned as a viewer. */
  viewer: Viewer;
};

export type LogOutInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type LogOutPayload = {
  __typename?: 'LogOutPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** Mutation is the top level type for mutations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** The callCloudCode mutation can be used to invoke a cloud code function. */
  callCloudCode?: Maybe<CallCloudCodePayload>;
  /** The createClass mutation can be used to create the schema for a new object class. */
  createClass?: Maybe<CreateClassPayload>;
  /** The createClient mutation can be used to create a new object of the Client class. */
  createClient?: Maybe<CreateClientPayload>;
  /** The createEmployee mutation can be used to create a new object of the Employee class. */
  createEmployee?: Maybe<CreateEmployeePayload>;
  /** The createEmployee_procedure mutation can be used to create a new object of the Employee_procedure class. */
  createEmployee_procedure?: Maybe<CreateEmployee_ProcedurePayload>;
  /** The createFile mutation can be used to create and upload a new file. */
  createFile?: Maybe<CreateFilePayload>;
  /** The createFinancal mutation can be used to create a new object of the Financal class. */
  createFinancal?: Maybe<CreateFinancalPayload>;
  /** The createProcedure mutation can be used to create a new object of the Procedure class. */
  createProcedure?: Maybe<CreateProcedurePayload>;
  /** The createRole mutation can be used to create a new object of the Role class. */
  createRole?: Maybe<CreateRolePayload>;
  /** The createSalon mutation can be used to create a new object of the Salon class. */
  createSalon?: Maybe<CreateSalonPayload>;
  /** The createSchedule mutation can be used to create a new object of the Schedule class. */
  createSchedule?: Maybe<CreateSchedulePayload>;
  /** The createSchedule_procedure mutation can be used to create a new object of the Schedule_procedure class. */
  createSchedule_procedure?: Maybe<CreateSchedule_ProcedurePayload>;
  /** The createSession mutation can be used to create a new object of the Session class. */
  createSession?: Maybe<CreateSessionPayload>;
  /** The createUser mutation can be used to create a new object of the User class. */
  createUser?: Maybe<CreateUserPayload>;
  /** The createVideos mutation can be used to create a new object of the Videos class. */
  createVideos?: Maybe<CreateVideosPayload>;
  /** The createVideos_categories mutation can be used to create a new object of the Videos_categories class. */
  createVideos_categories?: Maybe<CreateVideos_CategoriesPayload>;
  /** The deleteClass mutation can be used to delete an existing object class. */
  deleteClass?: Maybe<DeleteClassPayload>;
  /** The deleteClient mutation can be used to delete an object of the Client class. */
  deleteClient?: Maybe<DeleteClientPayload>;
  /** The deleteEmployee mutation can be used to delete an object of the Employee class. */
  deleteEmployee?: Maybe<DeleteEmployeePayload>;
  /** The deleteEmployee_procedure mutation can be used to delete an object of the Employee_procedure class. */
  deleteEmployee_procedure?: Maybe<DeleteEmployee_ProcedurePayload>;
  /** The deleteFinancal mutation can be used to delete an object of the Financal class. */
  deleteFinancal?: Maybe<DeleteFinancalPayload>;
  /** The deleteProcedure mutation can be used to delete an object of the Procedure class. */
  deleteProcedure?: Maybe<DeleteProcedurePayload>;
  /** The deleteRole mutation can be used to delete an object of the Role class. */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** The deleteSalon mutation can be used to delete an object of the Salon class. */
  deleteSalon?: Maybe<DeleteSalonPayload>;
  /** The deleteSchedule mutation can be used to delete an object of the Schedule class. */
  deleteSchedule?: Maybe<DeleteSchedulePayload>;
  /** The deleteSchedule_procedure mutation can be used to delete an object of the Schedule_procedure class. */
  deleteSchedule_procedure?: Maybe<DeleteSchedule_ProcedurePayload>;
  /** The deleteSession mutation can be used to delete an object of the Session class. */
  deleteSession?: Maybe<DeleteSessionPayload>;
  /** The deleteUser mutation can be used to delete an object of the User class. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** The deleteVideos mutation can be used to delete an object of the Videos class. */
  deleteVideos?: Maybe<DeleteVideosPayload>;
  /** The deleteVideos_categories mutation can be used to delete an object of the Videos_categories class. */
  deleteVideos_categories?: Maybe<DeleteVideos_CategoriesPayload>;
  /** The logIn mutation can be used to log in an existing user. */
  logIn?: Maybe<LogInPayload>;
  /** The logInWith mutation can be used to signup, login user with 3rd party authentication system. This mutation create a user if the authData do not correspond to an existing one. */
  logInWith?: Maybe<LogInWithPayload>;
  /** The logOut mutation can be used to log out an existing user. */
  logOut?: Maybe<LogOutPayload>;
  /** The resetPassword mutation can be used to reset the password of an existing user. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** The sendVerificationEmail mutation can be used to send the verification email again. */
  sendVerificationEmail?: Maybe<SendVerificationEmailPayload>;
  /** The signUp mutation can be used to create and sign up a new user. */
  signUp?: Maybe<SignUpPayload>;
  /** The updateClass mutation can be used to update the schema for an existing object class. */
  updateClass?: Maybe<UpdateClassPayload>;
  /** The updateClient mutation can be used to update an object of the Client class. */
  updateClient?: Maybe<UpdateClientPayload>;
  /** The updateEmployee mutation can be used to update an object of the Employee class. */
  updateEmployee?: Maybe<UpdateEmployeePayload>;
  /** The updateEmployee_procedure mutation can be used to update an object of the Employee_procedure class. */
  updateEmployee_procedure?: Maybe<UpdateEmployee_ProcedurePayload>;
  /** The updateFinancal mutation can be used to update an object of the Financal class. */
  updateFinancal?: Maybe<UpdateFinancalPayload>;
  /** The updateProcedure mutation can be used to update an object of the Procedure class. */
  updateProcedure?: Maybe<UpdateProcedurePayload>;
  /** The updateRole mutation can be used to update an object of the Role class. */
  updateRole?: Maybe<UpdateRolePayload>;
  /** The updateSalon mutation can be used to update an object of the Salon class. */
  updateSalon?: Maybe<UpdateSalonPayload>;
  /** The updateSchedule mutation can be used to update an object of the Schedule class. */
  updateSchedule?: Maybe<UpdateSchedulePayload>;
  /** The updateSchedule_procedure mutation can be used to update an object of the Schedule_procedure class. */
  updateSchedule_procedure?: Maybe<UpdateSchedule_ProcedurePayload>;
  /** The updateSession mutation can be used to update an object of the Session class. */
  updateSession?: Maybe<UpdateSessionPayload>;
  /** The updateUser mutation can be used to update an object of the User class. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** The updateVideos mutation can be used to update an object of the Videos class. */
  updateVideos?: Maybe<UpdateVideosPayload>;
  /** The updateVideos_categories mutation can be used to update an object of the Videos_categories class. */
  updateVideos_categories?: Maybe<UpdateVideos_CategoriesPayload>;
};


/** Mutation is the top level type for mutations. */
export type MutationCallCloudCodeArgs = {
  input: CallCloudCodeInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateEmployee_ProcedureArgs = {
  input: CreateEmployee_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateFinancalArgs = {
  input: CreateFinancalInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateProcedureArgs = {
  input: CreateProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateSalonArgs = {
  input: CreateSalonInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateScheduleArgs = {
  input: CreateScheduleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateSchedule_ProcedureArgs = {
  input: CreateSchedule_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateVideosArgs = {
  input: CreateVideosInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateVideos_CategoriesArgs = {
  input: CreateVideos_CategoriesInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteClassArgs = {
  input: DeleteClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteClientArgs = {
  input: DeleteClientInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteEmployeeArgs = {
  input: DeleteEmployeeInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteEmployee_ProcedureArgs = {
  input: DeleteEmployee_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteFinancalArgs = {
  input: DeleteFinancalInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteProcedureArgs = {
  input: DeleteProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteSalonArgs = {
  input: DeleteSalonInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteScheduleArgs = {
  input: DeleteScheduleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteSchedule_ProcedureArgs = {
  input: DeleteSchedule_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteSessionArgs = {
  input: DeleteSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteVideosArgs = {
  input: DeleteVideosInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteVideos_CategoriesArgs = {
  input: DeleteVideos_CategoriesInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogInArgs = {
  input: LogInInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogInWithArgs = {
  input: LogInWithInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogOutArgs = {
  input: LogOutInput;
};


/** Mutation is the top level type for mutations. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** Mutation is the top level type for mutations. */
export type MutationSendVerificationEmailArgs = {
  input: SendVerificationEmailInput;
};


/** Mutation is the top level type for mutations. */
export type MutationSignUpArgs = {
  input: SignUpInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateClientArgs = {
  input: UpdateClientInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateEmployee_ProcedureArgs = {
  input: UpdateEmployee_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateFinancalArgs = {
  input: UpdateFinancalInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateProcedureArgs = {
  input: UpdateProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateSalonArgs = {
  input: UpdateSalonInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateScheduleArgs = {
  input: UpdateScheduleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateSchedule_ProcedureArgs = {
  input: UpdateSchedule_ProcedureInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateVideosArgs = {
  input: UpdateVideosInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateVideos_CategoriesArgs = {
  input: UpdateVideos_CategoriesInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** The NumberWhereInput input type is used in operations that involve filtering objects by a field of type Number. */
export type NumberWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Float']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Float']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Float']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The ObjectWhereInput input type is used in operations that involve filtering result by a field of type Object. */
export type ObjectWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<KeyValueInput>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<KeyValueInput>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<KeyValueInput>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** The ParseObject interface type is used as a base type for the auto generated object types. */
export type ParseObject = {
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** The PointerFieldInput is used to specify a field of type pointer for an object class schema. */
export type PointerFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The PolygonWhereInput input type is used in operations that involve filtering objects by a field of type Polygon. */
export type PolygonWhereInput = {
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the geoIntersects operator to specify a constraint to select the objects where the values of a polygon field intersect a specified point. */
  geoIntersects?: InputMaybe<GeoIntersectsInput>;
};

/** The Procedure object type is used in operations that involve outputting objects of Procedure class. */
export type Procedure = Node & ParseObject & {
  __typename?: 'Procedure';
  ACL: Acl;
  /** This is the object commission_percentage. */
  commission_percentage?: Maybe<Scalars['Float']>;
  /** This is the object commission_value. */
  commission_value?: Maybe<Scalars['Float']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object employee_id. */
  employee_id?: Maybe<Employee>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object maintenance_days. */
  maintenance_days?: Maybe<Scalars['Float']>;
  /** This is the object maintenance_value. */
  maintenance_value?: Maybe<Scalars['Float']>;
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object salon_id. */
  salon_id?: Maybe<Salon>;
  /** This is the object time. */
  time?: Maybe<Scalars['Float']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object value. */
  value?: Maybe<Scalars['Float']>;
};

/** A connection to a list of items. */
export type ProcedureConnection = {
  __typename?: 'ProcedureConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProcedureEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProcedureEdge = {
  __typename?: 'ProcedureEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Procedure>;
};

/** The ProcedureOrder input type is used when sorting objects of the Procedure class. */
export enum ProcedureOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CommissionPercentageAsc = 'commission_percentage_ASC',
  CommissionPercentageDesc = 'commission_percentage_DESC',
  CommissionValueAsc = 'commission_value_ASC',
  CommissionValueDesc = 'commission_value_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmployeeIdAsc = 'employee_id_ASC',
  EmployeeIdDesc = 'employee_id_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MaintenanceDaysAsc = 'maintenance_days_ASC',
  MaintenanceDaysDesc = 'maintenance_days_DESC',
  MaintenanceValueAsc = 'maintenance_value_ASC',
  MaintenanceValueDesc = 'maintenance_value_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  SalonIdAsc = 'salon_id_ASC',
  SalonIdDesc = 'salon_id_DESC',
  TimeAsc = 'time_ASC',
  TimeDesc = 'time_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC'
}

/** Allow to link OR add and link an object of the Procedure class. */
export type ProcedurePointerInput = {
  /** Create and link an object from Procedure class. */
  createAndLink?: InputMaybe<CreateProcedureFieldsInput>;
  /** Link an existing object from Procedure class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Procedure class into a relation field. */
export type ProcedureRelationInput = {
  /** Add existing objects from the Procedure class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Procedure class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateProcedureFieldsInput>>;
  /** Remove existing objects from the Procedure class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The ProcedureRelationWhereInput input type is used in operations that involve filtering objects of Procedure class. */
export type ProcedureRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<ProcedureWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<ProcedureWhereInput>;
};

/** The ProcedureWhereInput input type is used in operations that involve filtering objects of Procedure class. */
export type ProcedureWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<ProcedureWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<ProcedureWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<ProcedureWhereInput>>;
  /** This is the object commission_percentage. */
  commission_percentage?: InputMaybe<NumberWhereInput>;
  /** This is the object commission_value. */
  commission_value?: InputMaybe<NumberWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeeRelationWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object maintenance_days. */
  maintenance_days?: InputMaybe<NumberWhereInput>;
  /** This is the object maintenance_value. */
  maintenance_value?: InputMaybe<NumberWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonRelationWhereInput>;
  /** This is the object time. */
  time?: InputMaybe<NumberWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object value. */
  value?: InputMaybe<NumberWhereInput>;
};

/** Allow to manage public rights. */
export type PublicAcl = {
  __typename?: 'PublicACL';
  /** Allow anyone to read the current object. */
  read?: Maybe<Scalars['Boolean']>;
  /** Allow anyone to write on the current object. */
  write?: Maybe<Scalars['Boolean']>;
};

/** Allow to manage public rights. */
export type PublicAclInput = {
  /** Allow anyone to read the current object. */
  read: Scalars['Boolean'];
  /** Allow anyone to write on the current object. */
  write: Scalars['Boolean'];
};

/** Query is the top level type for queries. */
export type Query = {
  __typename?: 'Query';
  /** The class query can be used to retrieve an existing object class. */
  class: Class;
  /** The classes query can be used to retrieve the existing object classes. */
  classes: Array<Class>;
  /** The client query can be used to get an object of the Client class by its id. */
  client: Client;
  /** The clients query can be used to find objects of the Client class. */
  clients: ClientConnection;
  /** The employee query can be used to get an object of the Employee class by its id. */
  employee: Employee;
  /** The employee_procedure query can be used to get an object of the Employee_procedure class by its id. */
  employee_procedure: Employee_Procedure;
  /** The employee_procedures query can be used to find objects of the Employee_procedure class. */
  employee_procedures: Employee_ProcedureConnection;
  /** The employees query can be used to find objects of the Employee class. */
  employees: EmployeeConnection;
  /** The financal query can be used to get an object of the Financal class by its id. */
  financal: Financal;
  /** The financals query can be used to find objects of the Financal class. */
  financals: FinancalConnection;
  /** The health query can be used to check if the server is up and running. */
  health: Scalars['Boolean'];
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** The procedure query can be used to get an object of the Procedure class by its id. */
  procedure: Procedure;
  /** The procedures query can be used to find objects of the Procedure class. */
  procedures: ProcedureConnection;
  /** The role query can be used to get an object of the Role class by its id. */
  role: Role;
  /** The roles query can be used to find objects of the Role class. */
  roles: RoleConnection;
  /** The salon query can be used to get an object of the Salon class by its id. */
  salon: Salon;
  /** The salons query can be used to find objects of the Salon class. */
  salons: SalonConnection;
  /** The schedule query can be used to get an object of the Schedule class by its id. */
  schedule: Schedule;
  /** The schedule_procedure query can be used to get an object of the Schedule_procedure class by its id. */
  schedule_procedure: Schedule_Procedure;
  /** The schedule_procedures query can be used to find objects of the Schedule_procedure class. */
  schedule_procedures: Schedule_ProcedureConnection;
  /** The schedules query can be used to find objects of the Schedule class. */
  schedules: ScheduleConnection;
  /** The session query can be used to get an object of the Session class by its id. */
  session: Session;
  /** The sessions query can be used to find objects of the Session class. */
  sessions: SessionConnection;
  /** The user query can be used to get an object of the User class by its id. */
  user: User;
  /** The users query can be used to find objects of the User class. */
  users: UserConnection;
  /** The videos query can be used to get an object of the Videos class by its id. */
  videos: Videos;
  /** The videos_categories query can be used to get an object of the Videos_categories class by its id. */
  videos_categories: Videos_Categories;
  /** The viewer query can be used to return the current user data. */
  viewer: Viewer;
};


/** Query is the top level type for queries. */
export type QueryClassArgs = {
  name: Scalars['String'];
};


/** Query is the top level type for queries. */
export type QueryClientArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryClientsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<ClientOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ClientWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryEmployeeArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryEmployee_ProcedureArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryEmployee_ProceduresArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<Employee_ProcedureOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Employee_ProcedureWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryEmployeesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<EmployeeOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmployeeWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryFinancalArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryFinancalsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<FinancalOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FinancalWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryNodeArgs = {
  id: Scalars['ID'];
};


/** Query is the top level type for queries. */
export type QueryProcedureArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryProceduresArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<ProcedureOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProcedureWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryRoleArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<RoleOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleWhereInput>;
};


/** Query is the top level type for queries. */
export type QuerySalonArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QuerySalonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<SalonOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SalonWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryScheduleArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QuerySchedule_ProcedureArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QuerySchedule_ProceduresArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<Schedule_ProcedureOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Schedule_ProcedureWhereInput>;
};


/** Query is the top level type for queries. */
export type QuerySchedulesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<ScheduleOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduleWhereInput>;
};


/** Query is the top level type for queries. */
export type QuerySessionArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QuerySessionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<SessionOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SessionWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryUserArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<UserOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryVideosArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryVideos_CategoriesArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};

/** The ReadOptionsInputt type is used in queries in order to set the read preferences. */
export type ReadOptionsInput = {
  /** The read preference for the queries to be executed to include fields. */
  includeReadPreference?: InputMaybe<ReadPreference>;
  /** The read preference for the main query to be executed. */
  readPreference?: InputMaybe<ReadPreference>;
  /** The read preference for the subqueries that may be required. */
  subqueryReadPreference?: InputMaybe<ReadPreference>;
};

/** The ReadPreference enum type is used in queries in order to select in which database replica the operation must run. */
export enum ReadPreference {
  Nearest = 'NEAREST',
  Primary = 'PRIMARY',
  PrimaryPreferred = 'PRIMARY_PREFERRED',
  Secondary = 'SECONDARY',
  SecondaryPreferred = 'SECONDARY_PREFERRED'
}

/** The RelationFieldInput is used to specify a field of type relation for an object class schema. */
export type RelationFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

export type ResetPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** The Role object type is used in operations that involve outputting objects of Role class. */
export type Role = Node & ParseObject & {
  __typename?: 'Role';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object roles. */
  roles: RoleConnection;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object users. */
  users: UserConnection;
};


/** The Role object type is used in operations that involve outputting objects of Role class. */
export type RoleRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<RoleOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleWhereInput>;
};


/** The Role object type is used in operations that involve outputting objects of Role class. */
export type RoleUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<UserOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

/** Allow to manage roles in ACL. If read and write are null the role have read and write rights. */
export type RoleAcl = {
  __typename?: 'RoleACL';
  /** Allow users who are members of the role to read the current object. */
  read: Scalars['Boolean'];
  /** Name of the targetted Role. */
  roleName: Scalars['ID'];
  /** Allow users who are members of the role to write on the current object. */
  write: Scalars['Boolean'];
};

/** Allow to manage roles in ACL. */
export type RoleAclInput = {
  /** Allow users who are members of the role to read the current object. */
  read: Scalars['Boolean'];
  /** Name of the targetted Role. */
  roleName: Scalars['String'];
  /** Allow users who are members of the role to write on the current object. */
  write: Scalars['Boolean'];
};

/** A connection to a list of items. */
export type RoleConnection = {
  __typename?: 'RoleConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RoleEdge = {
  __typename?: 'RoleEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Role>;
};

/** The RoleOrder input type is used when sorting objects of the Role class. */
export enum RoleOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  RolesAsc = 'roles_ASC',
  RolesDesc = 'roles_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UsersAsc = 'users_ASC',
  UsersDesc = 'users_DESC'
}

/** Allow to link OR add and link an object of the Role class. */
export type RolePointerInput = {
  /** Create and link an object from Role class. */
  createAndLink?: InputMaybe<CreateRoleFieldsInput>;
  /** Link an existing object from Role class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Role class into a relation field. */
export type RoleRelationInput = {
  /** Add existing objects from the Role class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Role class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateRoleFieldsInput>>;
  /** Remove existing objects from the Role class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The RoleRelationWhereInput input type is used in operations that involve filtering objects of Role class. */
export type RoleRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<RoleWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<RoleWhereInput>;
};

/** The RoleWhereInput input type is used in operations that involve filtering objects of Role class. */
export type RoleWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationWhereInput>;
};

/** The Salon object type is used in operations that involve outputting objects of Salon class. */
export type Salon = Node & ParseObject & {
  __typename?: 'Salon';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type SalonConnection = {
  __typename?: 'SalonConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SalonEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SalonEdge = {
  __typename?: 'SalonEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Salon>;
};

/** The SalonOrder input type is used when sorting objects of the Salon class. */
export enum SalonOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Salon class. */
export type SalonPointerInput = {
  /** Create and link an object from Salon class. */
  createAndLink?: InputMaybe<CreateSalonFieldsInput>;
  /** Link an existing object from Salon class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Salon class into a relation field. */
export type SalonRelationInput = {
  /** Add existing objects from the Salon class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Salon class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateSalonFieldsInput>>;
  /** Remove existing objects from the Salon class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The SalonRelationWhereInput input type is used in operations that involve filtering objects of Salon class. */
export type SalonRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<SalonWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<SalonWhereInput>;
};

/** The SalonWhereInput input type is used in operations that involve filtering objects of Salon class. */
export type SalonWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<SalonWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<SalonWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<SalonWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The Schedule object type is used in operations that involve outputting objects of Schedule class. */
export type Schedule = Node & ParseObject & {
  __typename?: 'Schedule';
  ACL: Acl;
  /** This is the object accomplished_schedule. */
  accomplished_schedule?: Maybe<Scalars['Boolean']>;
  /** This is the object analyzed_schedule. */
  analyzed_schedule?: Maybe<Scalars['Boolean']>;
  /** This is the object client_id. */
  client_id?: Maybe<Client>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object employee_id. */
  employee_id?: Maybe<Employee>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object salon_id. */
  salon_id?: Maybe<Salon>;
  /** This is the object schedule_date. */
  schedule_date?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type ScheduleConnection = {
  __typename?: 'ScheduleConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ScheduleEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ScheduleEdge = {
  __typename?: 'ScheduleEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Schedule>;
};

/** The ScheduleOrder input type is used when sorting objects of the Schedule class. */
export enum ScheduleOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  AccomplishedScheduleAsc = 'accomplished_schedule_ASC',
  AccomplishedScheduleDesc = 'accomplished_schedule_DESC',
  AnalyzedScheduleAsc = 'analyzed_schedule_ASC',
  AnalyzedScheduleDesc = 'analyzed_schedule_DESC',
  ClientIdAsc = 'client_id_ASC',
  ClientIdDesc = 'client_id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmployeeIdAsc = 'employee_id_ASC',
  EmployeeIdDesc = 'employee_id_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  SalonIdAsc = 'salon_id_ASC',
  SalonIdDesc = 'salon_id_DESC',
  ScheduleDateAsc = 'schedule_date_ASC',
  ScheduleDateDesc = 'schedule_date_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Schedule class. */
export type SchedulePointerInput = {
  /** Create and link an object from Schedule class. */
  createAndLink?: InputMaybe<CreateScheduleFieldsInput>;
  /** Link an existing object from Schedule class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Schedule class into a relation field. */
export type ScheduleRelationInput = {
  /** Add existing objects from the Schedule class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Schedule class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateScheduleFieldsInput>>;
  /** Remove existing objects from the Schedule class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The ScheduleRelationWhereInput input type is used in operations that involve filtering objects of Schedule class. */
export type ScheduleRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<ScheduleWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<ScheduleWhereInput>;
};

/** The ScheduleWhereInput input type is used in operations that involve filtering objects of Schedule class. */
export type ScheduleWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<ScheduleWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<ScheduleWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<ScheduleWhereInput>>;
  /** This is the object accomplished_schedule. */
  accomplished_schedule?: InputMaybe<BooleanWhereInput>;
  /** This is the object analyzed_schedule. */
  analyzed_schedule?: InputMaybe<BooleanWhereInput>;
  /** This is the object client_id. */
  client_id?: InputMaybe<ClientRelationWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeeRelationWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonRelationWhereInput>;
  /** This is the object schedule_date. */
  schedule_date?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The Schedule_procedure object type is used in operations that involve outputting objects of Schedule_procedure class. */
export type Schedule_Procedure = Node & ParseObject & {
  __typename?: 'Schedule_procedure';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object procedure_end_date. */
  procedure_end_date?: Maybe<Scalars['String']>;
  /** This is the object procedure_id. */
  procedure_id?: Maybe<Procedure>;
  /** This is the object procedure_start_date. */
  procedure_start_date?: Maybe<Scalars['String']>;
  /** This is the object schedule_id. */
  schedule_id?: Maybe<Schedule>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type Schedule_ProcedureConnection = {
  __typename?: 'Schedule_procedureConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<Schedule_ProcedureEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type Schedule_ProcedureEdge = {
  __typename?: 'Schedule_procedureEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Schedule_Procedure>;
};

/** The Schedule_procedureOrder input type is used when sorting objects of the Schedule_procedure class. */
export enum Schedule_ProcedureOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  ProcedureEndDateAsc = 'procedure_end_date_ASC',
  ProcedureEndDateDesc = 'procedure_end_date_DESC',
  ProcedureIdAsc = 'procedure_id_ASC',
  ProcedureIdDesc = 'procedure_id_DESC',
  ProcedureStartDateAsc = 'procedure_start_date_ASC',
  ProcedureStartDateDesc = 'procedure_start_date_DESC',
  ScheduleIdAsc = 'schedule_id_ASC',
  ScheduleIdDesc = 'schedule_id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Schedule_procedure class. */
export type Schedule_ProcedurePointerInput = {
  /** Create and link an object from Schedule_procedure class. */
  createAndLink?: InputMaybe<CreateSchedule_ProcedureFieldsInput>;
  /** Link an existing object from Schedule_procedure class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Schedule_procedure class into a relation field. */
export type Schedule_ProcedureRelationInput = {
  /** Add existing objects from the Schedule_procedure class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Schedule_procedure class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateSchedule_ProcedureFieldsInput>>;
  /** Remove existing objects from the Schedule_procedure class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The Schedule_procedureRelationWhereInput input type is used in operations that involve filtering objects of Schedule_procedure class. */
export type Schedule_ProcedureRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<Schedule_ProcedureWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<Schedule_ProcedureWhereInput>;
};

/** The Schedule_procedureWhereInput input type is used in operations that involve filtering objects of Schedule_procedure class. */
export type Schedule_ProcedureWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<Schedule_ProcedureWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<Schedule_ProcedureWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<Schedule_ProcedureWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object procedure_end_date. */
  procedure_end_date?: InputMaybe<StringWhereInput>;
  /** This is the object procedure_id. */
  procedure_id?: InputMaybe<ProcedureRelationWhereInput>;
  /** This is the object procedure_start_date. */
  procedure_start_date?: InputMaybe<StringWhereInput>;
  /** This is the object schedule_id. */
  schedule_id?: InputMaybe<ScheduleRelationWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The SchemaACLField is used to return information of an ACL field. */
export type SchemaAclField = SchemaField & {
  __typename?: 'SchemaACLField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaArrayField is used to return information of an Array field. */
export type SchemaArrayField = SchemaField & {
  __typename?: 'SchemaArrayField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaArrayFieldInput is used to specify a field of type array for an object class schema. */
export type SchemaArrayFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBooleanField is used to return information of a Boolean field. */
export type SchemaBooleanField = SchemaField & {
  __typename?: 'SchemaBooleanField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBooleanFieldInput is used to specify a field of type boolean for an object class schema. */
export type SchemaBooleanFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBytesField is used to return information of a Bytes field. */
export type SchemaBytesField = SchemaField & {
  __typename?: 'SchemaBytesField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBytesFieldInput is used to specify a field of type bytes for an object class schema. */
export type SchemaBytesFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaDateField is used to return information of a Date field. */
export type SchemaDateField = SchemaField & {
  __typename?: 'SchemaDateField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaDateFieldInput is used to specify a field of type date for an object class schema. */
export type SchemaDateFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaField interface type is used as a base type for the different supported fields of an object class schema. */
export type SchemaField = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaFieldInput is used to specify a field of an object class schema. */
export type SchemaFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The CreateClassSchemaInput type is used to specify the schema for a new object class to be created. */
export type SchemaFieldsInput = {
  /** These are the Array fields to be added to the class schema. */
  addArrays?: InputMaybe<Array<SchemaArrayFieldInput>>;
  /** These are the Boolean fields to be added to the class schema. */
  addBooleans?: InputMaybe<Array<SchemaBooleanFieldInput>>;
  /** These are the Bytes fields to be added to the class schema. */
  addBytes?: InputMaybe<Array<SchemaBytesFieldInput>>;
  /** These are the Date fields to be added to the class schema. */
  addDates?: InputMaybe<Array<SchemaDateFieldInput>>;
  /** These are the File fields to be added to the class schema. */
  addFiles?: InputMaybe<Array<SchemaFileFieldInput>>;
  /** This is the Geo Point field to be added to the class schema. Currently it is supported only one GeoPoint field per Class. */
  addGeoPoint?: InputMaybe<SchemaGeoPointFieldInput>;
  /** These are the Number fields to be added to the class schema. */
  addNumbers?: InputMaybe<Array<SchemaNumberFieldInput>>;
  /** These are the Object fields to be added to the class schema. */
  addObjects?: InputMaybe<Array<SchemaObjectFieldInput>>;
  /** These are the Pointer fields to be added to the class schema. */
  addPointers?: InputMaybe<Array<PointerFieldInput>>;
  /** These are the Polygon fields to be added to the class schema. */
  addPolygons?: InputMaybe<Array<SchemaPolygonFieldInput>>;
  /** These are the Relation fields to be added to the class schema. */
  addRelations?: InputMaybe<Array<RelationFieldInput>>;
  /** These are the String fields to be added to the class schema. */
  addStrings?: InputMaybe<Array<SchemaStringFieldInput>>;
  /** These are the fields to be removed from the class schema. */
  remove?: InputMaybe<Array<SchemaFieldInput>>;
};

/** The SchemaFileField is used to return information of a File field. */
export type SchemaFileField = SchemaField & {
  __typename?: 'SchemaFileField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaFileFieldInput is used to specify a field of type file for an object class schema. */
export type SchemaFileFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaGeoPointField is used to return information of a Geo Point field. */
export type SchemaGeoPointField = SchemaField & {
  __typename?: 'SchemaGeoPointField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaGeoPointFieldInput is used to specify a field of type geo point for an object class schema. */
export type SchemaGeoPointFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaNumberField is used to return information of a Number field. */
export type SchemaNumberField = SchemaField & {
  __typename?: 'SchemaNumberField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaNumberFieldInput is used to specify a field of type number for an object class schema. */
export type SchemaNumberFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaObjectField is used to return information of an Object field. */
export type SchemaObjectField = SchemaField & {
  __typename?: 'SchemaObjectField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaObjectFieldInput is used to specify a field of type object for an object class schema. */
export type SchemaObjectFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaPointerField is used to return information of a Pointer field. */
export type SchemaPointerField = SchemaField & {
  __typename?: 'SchemaPointerField';
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The SchemaPolygonField is used to return information of a Polygon field. */
export type SchemaPolygonField = SchemaField & {
  __typename?: 'SchemaPolygonField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaPolygonFieldInput is used to specify a field of type polygon for an object class schema. */
export type SchemaPolygonFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaRelationField is used to return information of a Relation field. */
export type SchemaRelationField = SchemaField & {
  __typename?: 'SchemaRelationField';
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The SchemaStringField is used to return information of a String field. */
export type SchemaStringField = SchemaField & {
  __typename?: 'SchemaStringField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaStringFieldInput is used to specify a field of type string for an object class schema. */
export type SchemaStringFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SearchInput type is used to specifiy a search operation on a full text search. */
export type SearchInput = {
  /** This is the flag to enable or disable case sensitive search. */
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  /** This is the flag to enable or disable diacritic sensitive search. */
  diacriticSensitive?: InputMaybe<Scalars['Boolean']>;
  /** This is the language to tetermine the list of stop words and the rules for tokenizer. */
  language?: InputMaybe<Scalars['String']>;
  /** This is the term to be searched. */
  term: Scalars['String'];
};

/** The SelectInput type is used to specify an inQueryKey or a notInQueryKey operation on a constraint. */
export type SelectInput = {
  /** This is the key in the result of the subquery that must match (not match) the field. */
  key: Scalars['String'];
  /** This is the subquery to be executed. */
  query: SubqueryInput;
};

export type SendVerificationEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type SendVerificationEmailPayload = {
  __typename?: 'SendVerificationEmailPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** The Session object type is used in operations that involve outputting objects of Session class. */
export type Session = Node & ParseObject & {
  __typename?: 'Session';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object createdWith. */
  createdWith?: Maybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: Maybe<Scalars['Date']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object installationId. */
  installationId?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object restricted. */
  restricted?: Maybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object user. */
  user?: Maybe<User>;
};

/** A connection to a list of items. */
export type SessionConnection = {
  __typename?: 'SessionConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SessionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SessionEdge = {
  __typename?: 'SessionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Session>;
};

/** The SessionOrder input type is used when sorting objects of the Session class. */
export enum SessionOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedWithAsc = 'createdWith_ASC',
  CreatedWithDesc = 'createdWith_DESC',
  ExpiresAtAsc = 'expiresAt_ASC',
  ExpiresAtDesc = 'expiresAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InstallationIdAsc = 'installationId_ASC',
  InstallationIdDesc = 'installationId_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  RestrictedAsc = 'restricted_ASC',
  RestrictedDesc = 'restricted_DESC',
  SessionTokenAsc = 'sessionToken_ASC',
  SessionTokenDesc = 'sessionToken_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UserAsc = 'user_ASC',
  UserDesc = 'user_DESC'
}

/** Allow to link OR add and link an object of the Session class. */
export type SessionPointerInput = {
  /** Create and link an object from Session class. */
  createAndLink?: InputMaybe<CreateSessionFieldsInput>;
  /** Link an existing object from Session class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Session class into a relation field. */
export type SessionRelationInput = {
  /** Add existing objects from the Session class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Session class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateSessionFieldsInput>>;
  /** Remove existing objects from the Session class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The SessionRelationWhereInput input type is used in operations that involve filtering objects of Session class. */
export type SessionRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<SessionWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<SessionWhereInput>;
};

/** The SessionWhereInput input type is used in operations that involve filtering objects of Session class. */
export type SessionWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<ObjectWhereInput>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object installationId. */
  installationId?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object restricted. */
  restricted?: InputMaybe<BooleanWhereInput>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object user. */
  user?: InputMaybe<UserRelationWhereInput>;
};

export type SignUpInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<CreateUserFieldsInput>;
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the new user that was created, signed up and returned as a viewer. */
  viewer: Viewer;
};

/** The StringWhereInput input type is used in operations that involve filtering objects by a field of type String. */
export type StringWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the matchesRegex operator to specify a constraint to select the objects where the value of a field matches a specified regular expression. */
  matchesRegex?: InputMaybe<Scalars['String']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
  /** This is the options operator to specify optional flags (such as "i" and "m") to be added to a matchesRegex operation in the same set of constraints. */
  options?: InputMaybe<Scalars['String']>;
  /** This is the $text operator to specify a full text search constraint. */
  text?: InputMaybe<TextInput>;
};

/** The SubqueryInput type is used to specify a sub query to another class. */
export type SubqueryInput = {
  /** This is the class name of the object. */
  className: Scalars['String'];
  /** These are the conditions that the objects need to match in order to be found */
  where: Scalars['Object'];
};

/** The TextInput type is used to specify a text operation on a constraint. */
export type TextInput = {
  /** This is the search to be executed. */
  search: SearchInput;
};

export type UpdateClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields?: InputMaybe<SchemaFieldsInput>;
};

export type UpdateClassPayload = {
  __typename?: 'UpdateClassPayload';
  /** This is the updated class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The UpdateClientFieldsInput input type is used in operations that involve creation of objects in the Client class. */
export type UpdateClientFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object birthdate. */
  birthdate?: InputMaybe<Scalars['String']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object tel. */
  tel?: InputMaybe<Scalars['String']>;
};

export type UpdateClientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateClientFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateClientPayload = {
  __typename?: 'UpdateClientPayload';
  /** This is the updated object. */
  client: Client;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The UpdateEmployeeFieldsInput input type is used in operations that involve creation of objects in the Employee class. */
export type UpdateEmployeeFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object can_access_salon. */
  can_access_salon?: InputMaybe<Scalars['Boolean']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object tel. */
  tel?: InputMaybe<Scalars['String']>;
};

export type UpdateEmployeeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateEmployeeFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateEmployeePayload = {
  __typename?: 'UpdateEmployeePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  employee: Employee;
};

/** The UpdateEmployee_procedureFieldsInput input type is used in operations that involve creation of objects in the Employee_procedure class. */
export type UpdateEmployee_ProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object procedure_id. */
  procedure_id?: InputMaybe<ProcedurePointerInput>;
};

export type UpdateEmployee_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateEmployee_ProcedureFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateEmployee_ProcedurePayload = {
  __typename?: 'UpdateEmployee_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  employee_procedure: Employee_Procedure;
};

/** The UpdateFinancalFieldsInput input type is used in operations that involve creation of objects in the Financal class. */
export type UpdateFinancalFieldsInput = {
  ACL?: InputMaybe<AclInput>;
};

export type UpdateFinancalInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateFinancalFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateFinancalPayload = {
  __typename?: 'UpdateFinancalPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  financal: Financal;
};

/** The UpdateProcedureFieldsInput input type is used in operations that involve creation of objects in the Procedure class. */
export type UpdateProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object commission_percentage. */
  commission_percentage?: InputMaybe<Scalars['Float']>;
  /** This is the object commission_value. */
  commission_value?: InputMaybe<Scalars['Float']>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object maintenance_days. */
  maintenance_days?: InputMaybe<Scalars['Float']>;
  /** This is the object maintenance_value. */
  maintenance_value?: InputMaybe<Scalars['Float']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object time. */
  time?: InputMaybe<Scalars['Float']>;
  /** This is the object value. */
  value?: InputMaybe<Scalars['Float']>;
};

export type UpdateProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateProcedureFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateProcedurePayload = {
  __typename?: 'UpdateProcedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  procedure: Procedure;
};

/** The UpdateRoleFieldsInput input type is used in operations that involve creation of objects in the Role class. */
export type UpdateRoleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationInput>;
};

export type UpdateRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateRoleFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateRolePayload = {
  __typename?: 'UpdateRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  role: Role;
};

/** The UpdateSalonFieldsInput input type is used in operations that involve creation of objects in the Salon class. */
export type UpdateSalonFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateSalonInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateSalonFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateSalonPayload = {
  __typename?: 'UpdateSalonPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  salon: Salon;
};

/** The UpdateScheduleFieldsInput input type is used in operations that involve creation of objects in the Schedule class. */
export type UpdateScheduleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object accomplished_schedule. */
  accomplished_schedule?: InputMaybe<Scalars['Boolean']>;
  /** This is the object analyzed_schedule. */
  analyzed_schedule?: InputMaybe<Scalars['Boolean']>;
  /** This is the object client_id. */
  client_id?: InputMaybe<ClientPointerInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object salon_id. */
  salon_id?: InputMaybe<SalonPointerInput>;
  /** This is the object schedule_date. */
  schedule_date?: InputMaybe<Scalars['String']>;
};

export type UpdateScheduleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateScheduleFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateSchedulePayload = {
  __typename?: 'UpdateSchedulePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  schedule: Schedule;
};

/** The UpdateSchedule_procedureFieldsInput input type is used in operations that involve creation of objects in the Schedule_procedure class. */
export type UpdateSchedule_ProcedureFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object procedure_end_date. */
  procedure_end_date?: InputMaybe<Scalars['String']>;
  /** This is the object procedure_id. */
  procedure_id?: InputMaybe<ProcedurePointerInput>;
  /** This is the object procedure_start_date. */
  procedure_start_date?: InputMaybe<Scalars['String']>;
  /** This is the object schedule_id. */
  schedule_id?: InputMaybe<SchedulePointerInput>;
};

export type UpdateSchedule_ProcedureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateSchedule_ProcedureFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateSchedule_ProcedurePayload = {
  __typename?: 'UpdateSchedule_procedurePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  schedule_procedure: Schedule_Procedure;
};

/** The UpdateSessionFieldsInput input type is used in operations that involve creation of objects in the Session class. */
export type UpdateSessionFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<Scalars['Date']>;
  /** This is the object installationId. */
  installationId?: InputMaybe<Scalars['String']>;
  /** This is the object restricted. */
  restricted?: InputMaybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<Scalars['String']>;
  /** This is the object user. */
  user?: InputMaybe<UserPointerInput>;
};

export type UpdateSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateSessionFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateSessionPayload = {
  __typename?: 'UpdateSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  session: Session;
};

/** The UpdateUserFieldsInput input type is used in operations that involve creation of objects in the User class. */
export type UpdateUserFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object acc_type. */
  acc_type?: InputMaybe<Scalars['String']>;
  /** This is the object authData. */
  authData?: InputMaybe<Scalars['Object']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object first_access. */
  first_access?: InputMaybe<Scalars['Boolean']>;
  /** This is the object password. */
  password?: InputMaybe<Scalars['String']>;
  /** This is the object username. */
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateUserFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  user: User;
};

/** The UpdateVideosFieldsInput input type is used in operations that involve creation of objects in the Videos class. */
export type UpdateVideosFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object category_id. */
  category_id?: InputMaybe<Videos_CategoriesPointerInput>;
  /** This is the object description. */
  description?: InputMaybe<Scalars['String']>;
  /** This is the object id_ref. */
  id_ref?: InputMaybe<Scalars['String']>;
  /** This is the object mandatory_inputs. */
  mandatory_inputs?: InputMaybe<Scalars['String']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object video. */
  video?: InputMaybe<FileInput>;
};

export type UpdateVideosInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateVideosFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateVideosPayload = {
  __typename?: 'UpdateVideosPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  videos: Videos;
};

/** The UpdateVideos_categoriesFieldsInput input type is used in operations that involve creation of objects in the Videos_categories class. */
export type UpdateVideos_CategoriesFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object active. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateVideos_CategoriesInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateVideos_CategoriesFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateVideos_CategoriesPayload = {
  __typename?: 'UpdateVideos_categoriesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  videos_categories: Videos_Categories;
};

/** The User object type is used in operations that involve outputting objects of User class. */
export type User = Node & ParseObject & {
  __typename?: 'User';
  ACL: Acl;
  /** This is the object acc_type. */
  acc_type: Scalars['String'];
  /** This is the object authData. */
  authData?: Maybe<Scalars['Object']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object email. */
  email?: Maybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: Maybe<Scalars['Boolean']>;
  /** This is the object employee_id. */
  employee_id?: Maybe<Employee>;
  /** This is the object first_access. */
  first_access: Scalars['Boolean'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object username. */
  username?: Maybe<Scalars['String']>;
};

/** Allow to manage users in ACL. If read and write are null the users have read and write rights. */
export type UserAcl = {
  __typename?: 'UserACL';
  /** Allow the user to read the current object. */
  read: Scalars['Boolean'];
  /** ID of the targetted User. */
  userId: Scalars['ID'];
  /** Allow the user to write on the current object. */
  write: Scalars['Boolean'];
};

/** Allow to manage users in ACL. */
export type UserAclInput = {
  /** Allow the user to read the current object. */
  read: Scalars['Boolean'];
  /** ID of the targetted User. */
  userId: Scalars['ID'];
  /** Allow the user to write on the current object. */
  write: Scalars['Boolean'];
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<User>;
};

export type UserLoginWithInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object acc_type. */
  acc_type: Scalars['String'];
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeePointerInput>;
  /** This is the object first_access. */
  first_access: Scalars['Boolean'];
};

/** The UserOrder input type is used when sorting objects of the User class. */
export enum UserOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  AccTypeAsc = 'acc_type_ASC',
  AccTypeDesc = 'acc_type_DESC',
  AuthDataAsc = 'authData_ASC',
  AuthDataDesc = 'authData_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailVerifiedAsc = 'emailVerified_ASC',
  EmailVerifiedDesc = 'emailVerified_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  EmployeeIdAsc = 'employee_id_ASC',
  EmployeeIdDesc = 'employee_id_DESC',
  FirstAccessAsc = 'first_access_ASC',
  FirstAccessDesc = 'first_access_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UsernameAsc = 'username_ASC',
  UsernameDesc = 'username_DESC'
}

/** Allow to link OR add and link an object of the User class. */
export type UserPointerInput = {
  /** Create and link an object from User class. */
  createAndLink?: InputMaybe<CreateUserFieldsInput>;
  /** Link an existing object from User class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the User class into a relation field. */
export type UserRelationInput = {
  /** Add existing objects from the User class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the User class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateUserFieldsInput>>;
  /** Remove existing objects from the User class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The UserRelationWhereInput input type is used in operations that involve filtering objects of User class. */
export type UserRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<UserWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<UserWhereInput>;
};

/** The UserWhereInput input type is used in operations that involve filtering objects of User class. */
export type UserWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<UserWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** This is the object acc_type. */
  acc_type?: InputMaybe<StringWhereInput>;
  /** This is the object authData. */
  authData?: InputMaybe<ObjectWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object email. */
  email?: InputMaybe<StringWhereInput>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<BooleanWhereInput>;
  /** This is the object employee_id. */
  employee_id?: InputMaybe<EmployeeRelationWhereInput>;
  /** This is the object first_access. */
  first_access?: InputMaybe<BooleanWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object password. */
  password?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object username. */
  username?: InputMaybe<StringWhereInput>;
};

/** The Videos object type is used in operations that involve outputting objects of Videos class. */
export type Videos = Node & ParseObject & {
  __typename?: 'Videos';
  ACL: Acl;
  /** This is the object category_id. */
  category_id: Videos_Categories;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object description. */
  description: Scalars['String'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id_ref. */
  id_ref: Scalars['String'];
  /** This is the object mandatory_inputs. */
  mandatory_inputs?: Maybe<Scalars['String']>;
  /** This is the object name. */
  name: Scalars['String'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object video. */
  video: FileInfo;
};

/** A connection to a list of items. */
export type VideosConnection = {
  __typename?: 'VideosConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<VideosEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type VideosEdge = {
  __typename?: 'VideosEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Videos>;
};

/** The VideosOrder input type is used when sorting objects of the Videos class. */
export enum VideosOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CategoryIdAsc = 'category_id_ASC',
  CategoryIdDesc = 'category_id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IdRefAsc = 'id_ref_ASC',
  IdRefDesc = 'id_ref_DESC',
  MandatoryInputsAsc = 'mandatory_inputs_ASC',
  MandatoryInputsDesc = 'mandatory_inputs_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VideoAsc = 'video_ASC',
  VideoDesc = 'video_DESC'
}

/** Allow to link OR add and link an object of the Videos class. */
export type VideosPointerInput = {
  /** Create and link an object from Videos class. */
  createAndLink?: InputMaybe<CreateVideosFieldsInput>;
  /** Link an existing object from Videos class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Videos class into a relation field. */
export type VideosRelationInput = {
  /** Add existing objects from the Videos class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Videos class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateVideosFieldsInput>>;
  /** Remove existing objects from the Videos class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The VideosRelationWhereInput input type is used in operations that involve filtering objects of Videos class. */
export type VideosRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<VideosWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<VideosWhereInput>;
};

/** The VideosWhereInput input type is used in operations that involve filtering objects of Videos class. */
export type VideosWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<VideosWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<VideosWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<VideosWhereInput>>;
  /** This is the object category_id. */
  category_id?: InputMaybe<Videos_CategoriesRelationWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object description. */
  description?: InputMaybe<StringWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object id_ref. */
  id_ref?: InputMaybe<StringWhereInput>;
  /** This is the object mandatory_inputs. */
  mandatory_inputs?: InputMaybe<StringWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object video. */
  video?: InputMaybe<FileWhereInput>;
};

/** The Videos_categories object type is used in operations that involve outputting objects of Videos_categories class. */
export type Videos_Categories = Node & ParseObject & {
  __typename?: 'Videos_categories';
  ACL: Acl;
  /** This is the object active. */
  active?: Maybe<Scalars['Boolean']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name: Scalars['String'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** A connection to a list of items. */
export type Videos_CategoriesConnection = {
  __typename?: 'Videos_categoriesConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<Videos_CategoriesEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type Videos_CategoriesEdge = {
  __typename?: 'Videos_categoriesEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Videos_Categories>;
};

/** The Videos_categoriesOrder input type is used when sorting objects of the Videos_categories class. */
export enum Videos_CategoriesOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** Allow to link OR add and link an object of the Videos_categories class. */
export type Videos_CategoriesPointerInput = {
  /** Create and link an object from Videos_categories class. */
  createAndLink?: InputMaybe<CreateVideos_CategoriesFieldsInput>;
  /** Link an existing object from Videos_categories class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Videos_categories class into a relation field. */
export type Videos_CategoriesRelationInput = {
  /** Add existing objects from the Videos_categories class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Videos_categories class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateVideos_CategoriesFieldsInput>>;
  /** Remove existing objects from the Videos_categories class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The Videos_categoriesRelationWhereInput input type is used in operations that involve filtering objects of Videos_categories class. */
export type Videos_CategoriesRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<Videos_CategoriesWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<Videos_CategoriesWhereInput>;
};

/** The Videos_categoriesWhereInput input type is used in operations that involve filtering objects of Videos_categories class. */
export type Videos_CategoriesWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<Videos_CategoriesWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<Videos_CategoriesWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<Videos_CategoriesWhereInput>>;
  /** This is the object active. */
  active?: InputMaybe<BooleanWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
};

/** The Viewer object type is used in operations that involve outputting the current user data. */
export type Viewer = {
  __typename?: 'Viewer';
  /** The current user session token. */
  sessionToken: Scalars['String'];
  /** This is the current user. */
  user: User;
};

/** The WithinInput type is used to specify a within operation on a constraint. */
export type WithinInput = {
  /** This is the box to be specified. */
  box: BoxInput;
};
