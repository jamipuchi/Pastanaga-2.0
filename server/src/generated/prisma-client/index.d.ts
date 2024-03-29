// Code generated by Prisma (prisma@1.34.8). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  classe: (where?: ClasseWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  classe: (where: ClasseWhereUniqueInput) => ClasseNullablePromise;
  classes: (args?: {
    where?: ClasseWhereInput;
    orderBy?: ClasseOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Classe>;
  classesConnection: (args?: {
    where?: ClasseWhereInput;
    orderBy?: ClasseOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ClasseConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createClasse: (data: ClasseCreateInput) => ClassePromise;
  updateClasse: (args: {
    data: ClasseUpdateInput;
    where: ClasseWhereUniqueInput;
  }) => ClassePromise;
  updateManyClasses: (args: {
    data: ClasseUpdateManyMutationInput;
    where?: ClasseWhereInput;
  }) => BatchPayloadPromise;
  upsertClasse: (args: {
    where: ClasseWhereUniqueInput;
    create: ClasseCreateInput;
    update: ClasseUpdateInput;
  }) => ClassePromise;
  deleteClasse: (where: ClasseWhereUniqueInput) => ClassePromise;
  deleteManyClasses: (where?: ClasseWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  classe: (
    where?: ClasseSubscriptionWhereInput
  ) => ClasseSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ClasseOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "aules_ASC"
  | "aules_DESC"
  | "durada_ASC"
  | "durada_DESC"
  | "inici_ASC"
  | "inici_DESC"
  | "diaSetmana_ASC"
  | "diaSetmana_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "latitude_ASC"
  | "latitude_DESC"
  | "longitude_ASC"
  | "longitude_DESC"
  | "alive_ASC"
  | "alive_DESC"
  | "monedes_ASC"
  | "monedes_DESC"
  | "winner_ASC"
  | "winner_DESC"
  | "rang_ASC"
  | "rang_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  objectiu?: Maybe<UserWhereInput>;
  latitude?: Maybe<String>;
  latitude_not?: Maybe<String>;
  latitude_in?: Maybe<String[] | String>;
  latitude_not_in?: Maybe<String[] | String>;
  latitude_lt?: Maybe<String>;
  latitude_lte?: Maybe<String>;
  latitude_gt?: Maybe<String>;
  latitude_gte?: Maybe<String>;
  latitude_contains?: Maybe<String>;
  latitude_not_contains?: Maybe<String>;
  latitude_starts_with?: Maybe<String>;
  latitude_not_starts_with?: Maybe<String>;
  latitude_ends_with?: Maybe<String>;
  latitude_not_ends_with?: Maybe<String>;
  longitude?: Maybe<String>;
  longitude_not?: Maybe<String>;
  longitude_in?: Maybe<String[] | String>;
  longitude_not_in?: Maybe<String[] | String>;
  longitude_lt?: Maybe<String>;
  longitude_lte?: Maybe<String>;
  longitude_gt?: Maybe<String>;
  longitude_gte?: Maybe<String>;
  longitude_contains?: Maybe<String>;
  longitude_not_contains?: Maybe<String>;
  longitude_starts_with?: Maybe<String>;
  longitude_not_starts_with?: Maybe<String>;
  longitude_ends_with?: Maybe<String>;
  longitude_not_ends_with?: Maybe<String>;
  alive?: Maybe<Boolean>;
  alive_not?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  monedes_not?: Maybe<Int>;
  monedes_in?: Maybe<Int[] | Int>;
  monedes_not_in?: Maybe<Int[] | Int>;
  monedes_lt?: Maybe<Int>;
  monedes_lte?: Maybe<Int>;
  monedes_gt?: Maybe<Int>;
  monedes_gte?: Maybe<Int>;
  winner?: Maybe<Boolean>;
  winner_not?: Maybe<Boolean>;
  horari_some?: Maybe<ClasseWhereInput>;
  rang?: Maybe<Int>;
  rang_not?: Maybe<Int>;
  rang_in?: Maybe<Int[] | Int>;
  rang_not_in?: Maybe<Int[] | Int>;
  rang_lt?: Maybe<Int>;
  rang_lte?: Maybe<Int>;
  rang_gt?: Maybe<Int>;
  rang_gte?: Maybe<Int>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface ClasseCreateManyInput {
  create?: Maybe<ClasseCreateInput[] | ClasseCreateInput>;
  connect?: Maybe<ClasseWhereUniqueInput[] | ClasseWhereUniqueInput>;
}

export interface ClasseUpdateManyInput {
  create?: Maybe<ClasseCreateInput[] | ClasseCreateInput>;
  update?: Maybe<
    | ClasseUpdateWithWhereUniqueNestedInput[]
    | ClasseUpdateWithWhereUniqueNestedInput
  >;
  upsert?: Maybe<
    | ClasseUpsertWithWhereUniqueNestedInput[]
    | ClasseUpsertWithWhereUniqueNestedInput
  >;
  delete?: Maybe<ClasseWhereUniqueInput[] | ClasseWhereUniqueInput>;
  connect?: Maybe<ClasseWhereUniqueInput[] | ClasseWhereUniqueInput>;
  set?: Maybe<ClasseWhereUniqueInput[] | ClasseWhereUniqueInput>;
  disconnect?: Maybe<ClasseWhereUniqueInput[] | ClasseWhereUniqueInput>;
  deleteMany?: Maybe<ClasseScalarWhereInput[] | ClasseScalarWhereInput>;
  updateMany?: Maybe<
    | ClasseUpdateManyWithWhereNestedInput[]
    | ClasseUpdateManyWithWhereNestedInput
  >;
}

export type ClasseWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserUpdateWithoutObjectiuDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  latitude?: Maybe<String>;
  longitude?: Maybe<String>;
  alive?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  winner?: Maybe<Boolean>;
  horari?: Maybe<ClasseUpdateManyInput>;
  rang?: Maybe<Int>;
}

export interface ClasseWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  aules?: Maybe<String>;
  aules_not?: Maybe<String>;
  aules_in?: Maybe<String[] | String>;
  aules_not_in?: Maybe<String[] | String>;
  aules_lt?: Maybe<String>;
  aules_lte?: Maybe<String>;
  aules_gt?: Maybe<String>;
  aules_gte?: Maybe<String>;
  aules_contains?: Maybe<String>;
  aules_not_contains?: Maybe<String>;
  aules_starts_with?: Maybe<String>;
  aules_not_starts_with?: Maybe<String>;
  aules_ends_with?: Maybe<String>;
  aules_not_ends_with?: Maybe<String>;
  durada?: Maybe<Int>;
  durada_not?: Maybe<Int>;
  durada_in?: Maybe<Int[] | Int>;
  durada_not_in?: Maybe<Int[] | Int>;
  durada_lt?: Maybe<Int>;
  durada_lte?: Maybe<Int>;
  durada_gt?: Maybe<Int>;
  durada_gte?: Maybe<Int>;
  inici?: Maybe<Int>;
  inici_not?: Maybe<Int>;
  inici_in?: Maybe<Int[] | Int>;
  inici_not_in?: Maybe<Int[] | Int>;
  inici_lt?: Maybe<Int>;
  inici_lte?: Maybe<Int>;
  inici_gt?: Maybe<Int>;
  inici_gte?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
  diaSetmana_not?: Maybe<Int>;
  diaSetmana_in?: Maybe<Int[] | Int>;
  diaSetmana_not_in?: Maybe<Int[] | Int>;
  diaSetmana_lt?: Maybe<Int>;
  diaSetmana_lte?: Maybe<Int>;
  diaSetmana_gt?: Maybe<Int>;
  diaSetmana_gte?: Maybe<Int>;
  AND?: Maybe<ClasseWhereInput[] | ClasseWhereInput>;
}

export interface UserUpsertWithoutObjectiuInput {
  update: UserUpdateWithoutObjectiuDataInput;
  create: UserCreateWithoutObjectiuInput;
}

export interface ClasseUpdateManyWithWhereNestedInput {
  where: ClasseScalarWhereInput;
  data: ClasseUpdateManyDataInput;
}

export interface ClasseCreateInput {
  id?: Maybe<ID_Input>;
  aules: String;
  durada: Int;
  inici: Int;
  diaSetmana: Int;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  email?: Maybe<String>;
}>;

export interface ClasseUpdateInput {
  aules?: Maybe<String>;
  durada?: Maybe<Int>;
  inici?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
}

export interface ClasseUpdateDataInput {
  aules?: Maybe<String>;
  durada?: Maybe<Int>;
  inici?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
}

export interface ClasseUpdateManyMutationInput {
  aules?: Maybe<String>;
  durada?: Maybe<Int>;
  inici?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
}

export interface ClasseSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ClasseWhereInput>;
  AND?: Maybe<ClasseSubscriptionWhereInput[] | ClasseSubscriptionWhereInput>;
}

export interface UserUpdateOneWithoutObjectiuInput {
  create?: Maybe<UserCreateWithoutObjectiuInput>;
  update?: Maybe<UserUpdateWithoutObjectiuDataInput>;
  upsert?: Maybe<UserUpsertWithoutObjectiuInput>;
  delete?: Maybe<Boolean>;
  disconnect?: Maybe<Boolean>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  latitude?: Maybe<String>;
  longitude?: Maybe<String>;
  alive?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  winner?: Maybe<Boolean>;
  rang?: Maybe<Int>;
}

export interface UserCreateWithoutObjectiuInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  latitude?: Maybe<String>;
  longitude?: Maybe<String>;
  alive?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  winner: Boolean;
  horari?: Maybe<ClasseCreateManyInput>;
  rang: Int;
}

export interface UserCreateOneWithoutObjectiuInput {
  create?: Maybe<UserCreateWithoutObjectiuInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  objectiu?: Maybe<UserCreateOneWithoutObjectiuInput>;
  latitude?: Maybe<String>;
  longitude?: Maybe<String>;
  alive?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  winner: Boolean;
  horari?: Maybe<ClasseCreateManyInput>;
  rang: Int;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  objectiu?: Maybe<UserUpdateOneWithoutObjectiuInput>;
  latitude?: Maybe<String>;
  longitude?: Maybe<String>;
  alive?: Maybe<Boolean>;
  monedes?: Maybe<Int>;
  winner?: Maybe<Boolean>;
  horari?: Maybe<ClasseUpdateManyInput>;
  rang?: Maybe<Int>;
}

export interface ClasseUpdateManyDataInput {
  aules?: Maybe<String>;
  durada?: Maybe<Int>;
  inici?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
}

export interface ClasseUpdateWithWhereUniqueNestedInput {
  where: ClasseWhereUniqueInput;
  data: ClasseUpdateDataInput;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface ClasseUpsertWithWhereUniqueNestedInput {
  where: ClasseWhereUniqueInput;
  update: ClasseUpdateDataInput;
  create: ClasseCreateInput;
}

export interface ClasseScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  aules?: Maybe<String>;
  aules_not?: Maybe<String>;
  aules_in?: Maybe<String[] | String>;
  aules_not_in?: Maybe<String[] | String>;
  aules_lt?: Maybe<String>;
  aules_lte?: Maybe<String>;
  aules_gt?: Maybe<String>;
  aules_gte?: Maybe<String>;
  aules_contains?: Maybe<String>;
  aules_not_contains?: Maybe<String>;
  aules_starts_with?: Maybe<String>;
  aules_not_starts_with?: Maybe<String>;
  aules_ends_with?: Maybe<String>;
  aules_not_ends_with?: Maybe<String>;
  durada?: Maybe<Int>;
  durada_not?: Maybe<Int>;
  durada_in?: Maybe<Int[] | Int>;
  durada_not_in?: Maybe<Int[] | Int>;
  durada_lt?: Maybe<Int>;
  durada_lte?: Maybe<Int>;
  durada_gt?: Maybe<Int>;
  durada_gte?: Maybe<Int>;
  inici?: Maybe<Int>;
  inici_not?: Maybe<Int>;
  inici_in?: Maybe<Int[] | Int>;
  inici_not_in?: Maybe<Int[] | Int>;
  inici_lt?: Maybe<Int>;
  inici_lte?: Maybe<Int>;
  inici_gt?: Maybe<Int>;
  inici_gte?: Maybe<Int>;
  diaSetmana?: Maybe<Int>;
  diaSetmana_not?: Maybe<Int>;
  diaSetmana_in?: Maybe<Int[] | Int>;
  diaSetmana_not_in?: Maybe<Int[] | Int>;
  diaSetmana_lt?: Maybe<Int>;
  diaSetmana_lte?: Maybe<Int>;
  diaSetmana_gt?: Maybe<Int>;
  diaSetmana_gte?: Maybe<Int>;
  AND?: Maybe<ClasseScalarWhereInput[] | ClasseScalarWhereInput>;
  OR?: Maybe<ClasseScalarWhereInput[] | ClasseScalarWhereInput>;
  NOT?: Maybe<ClasseScalarWhereInput[] | ClasseScalarWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateClasse {
  count: Int;
}

export interface AggregateClassePromise
  extends Promise<AggregateClasse>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateClasseSubscription
  extends Promise<AsyncIterator<AggregateClasse>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface ClasseSubscriptionPayload {
  mutation: MutationType;
  node: Classe;
  updatedFields: String[];
  previousValues: ClassePreviousValues;
}

export interface ClasseSubscriptionPayloadPromise
  extends Promise<ClasseSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ClassePromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ClassePreviousValuesPromise>() => T;
}

export interface ClasseSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ClasseSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ClasseSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ClassePreviousValuesSubscription>() => T;
}

export interface ClasseEdge {
  node: Classe;
  cursor: String;
}

export interface ClasseEdgePromise extends Promise<ClasseEdge>, Fragmentable {
  node: <T = ClassePromise>() => T;
  cursor: () => Promise<String>;
}

export interface ClasseEdgeSubscription
  extends Promise<AsyncIterator<ClasseEdge>>,
    Fragmentable {
  node: <T = ClasseSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  name: String;
  email: String;
  latitude?: String;
  longitude?: String;
  alive?: Boolean;
  monedes?: Int;
  winner: Boolean;
  rang: Int;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  latitude: () => Promise<String>;
  longitude: () => Promise<String>;
  alive: () => Promise<Boolean>;
  monedes: () => Promise<Int>;
  winner: () => Promise<Boolean>;
  rang: () => Promise<Int>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  latitude: () => Promise<AsyncIterator<String>>;
  longitude: () => Promise<AsyncIterator<String>>;
  alive: () => Promise<AsyncIterator<Boolean>>;
  monedes: () => Promise<AsyncIterator<Int>>;
  winner: () => Promise<AsyncIterator<Boolean>>;
  rang: () => Promise<AsyncIterator<Int>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ClassePreviousValues {
  id: ID_Output;
  aules: String;
  durada: Int;
  inici: Int;
  diaSetmana: Int;
}

export interface ClassePreviousValuesPromise
  extends Promise<ClassePreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  aules: () => Promise<String>;
  durada: () => Promise<Int>;
  inici: () => Promise<Int>;
  diaSetmana: () => Promise<Int>;
}

export interface ClassePreviousValuesSubscription
  extends Promise<AsyncIterator<ClassePreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  aules: () => Promise<AsyncIterator<String>>;
  durada: () => Promise<AsyncIterator<Int>>;
  inici: () => Promise<AsyncIterator<Int>>;
  diaSetmana: () => Promise<AsyncIterator<Int>>;
}

export interface ClasseConnection {
  pageInfo: PageInfo;
  edges: ClasseEdge[];
}

export interface ClasseConnectionPromise
  extends Promise<ClasseConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ClasseEdge>>() => T;
  aggregate: <T = AggregateClassePromise>() => T;
}

export interface ClasseConnectionSubscription
  extends Promise<AsyncIterator<ClasseConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ClasseEdgeSubscription>>>() => T;
  aggregate: <T = AggregateClasseSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface Classe {
  id: ID_Output;
  aules: String;
  durada: Int;
  inici: Int;
  diaSetmana: Int;
}

export interface ClassePromise extends Promise<Classe>, Fragmentable {
  id: () => Promise<ID_Output>;
  aules: () => Promise<String>;
  durada: () => Promise<Int>;
  inici: () => Promise<Int>;
  diaSetmana: () => Promise<Int>;
}

export interface ClasseSubscription
  extends Promise<AsyncIterator<Classe>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  aules: () => Promise<AsyncIterator<String>>;
  durada: () => Promise<AsyncIterator<Int>>;
  inici: () => Promise<AsyncIterator<Int>>;
  diaSetmana: () => Promise<AsyncIterator<Int>>;
}

export interface ClasseNullablePromise
  extends Promise<Classe | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  aules: () => Promise<String>;
  durada: () => Promise<Int>;
  inici: () => Promise<Int>;
  diaSetmana: () => Promise<Int>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface User {
  id: ID_Output;
  createdAt: DateTimeOutput;
  name: String;
  email: String;
  latitude?: String;
  longitude?: String;
  alive?: Boolean;
  monedes?: Int;
  winner: Boolean;
  rang: Int;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  objectiu: <T = UserPromise>() => T;
  latitude: () => Promise<String>;
  longitude: () => Promise<String>;
  alive: () => Promise<Boolean>;
  monedes: () => Promise<Int>;
  winner: () => Promise<Boolean>;
  horari: <T = FragmentableArray<Classe>>(args?: {
    where?: ClasseWhereInput;
    orderBy?: ClasseOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  rang: () => Promise<Int>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  objectiu: <T = UserSubscription>() => T;
  latitude: () => Promise<AsyncIterator<String>>;
  longitude: () => Promise<AsyncIterator<String>>;
  alive: () => Promise<AsyncIterator<Boolean>>;
  monedes: () => Promise<AsyncIterator<Int>>;
  winner: () => Promise<AsyncIterator<Boolean>>;
  horari: <T = Promise<AsyncIterator<ClasseSubscription>>>(args?: {
    where?: ClasseWhereInput;
    orderBy?: ClasseOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  rang: () => Promise<AsyncIterator<Int>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  objectiu: <T = UserPromise>() => T;
  latitude: () => Promise<String>;
  longitude: () => Promise<String>;
  alive: () => Promise<Boolean>;
  monedes: () => Promise<Int>;
  winner: () => Promise<Boolean>;
  horari: <T = FragmentableArray<Classe>>(args?: {
    where?: ClasseWhereInput;
    orderBy?: ClasseOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  rang: () => Promise<Int>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Classe",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
