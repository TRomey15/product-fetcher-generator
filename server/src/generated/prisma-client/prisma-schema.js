module.exports = {
        typeDefs: /* GraphQL */ `type AggregatefieldMetaData {
  count: Int!
}

type AggregateHtmlMetaData {
  count: Int!
}

type AggregateProductFetcher {
  count: Int!
}

type AggregateProductObservation {
  count: Int!
}

type AggregateProductPage {
  count: Int!
}

type AggregateRelatedProduct {
  count: Int!
}

type AggregateScriptMetaData {
  count: Int!
}

type AggregateSimilarProduct {
  count: Int!
}

type AggregateStore {
  count: Int!
}

type AggregateTransformation {
  count: Int!
}

type AggregateXhrMetaData {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum DataSource {
  XHR
  SCRIPT
  HTML
}

type fieldMetaData {
  id: ID!
  name: String!
  foundIn: [DataSource!]!
  xhrMetaData: XhrMetaData
  scriptMetaData: ScriptMetaData
  htmlMetaData: HtmlMetaData
}

type fieldMetaDataConnection {
  pageInfo: PageInfo!
  edges: [fieldMetaDataEdge]!
  aggregate: AggregatefieldMetaData!
}

input fieldMetaDataCreatefoundInInput {
  set: [DataSource!]
}

input fieldMetaDataCreateInput {
  name: String!
  foundIn: fieldMetaDataCreatefoundInInput
  xhrMetaData: XhrMetaDataCreateOneInput
  scriptMetaData: ScriptMetaDataCreateOneInput
  htmlMetaData: HtmlMetaDataCreateOneInput
}

type fieldMetaDataEdge {
  node: fieldMetaData!
  cursor: String!
}

enum fieldMetaDataOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type fieldMetaDataPreviousValues {
  id: ID!
  name: String!
  foundIn: [DataSource!]!
}

type fieldMetaDataSubscriptionPayload {
  mutation: MutationType!
  node: fieldMetaData
  updatedFields: [String!]
  previousValues: fieldMetaDataPreviousValues
}

input fieldMetaDataSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: fieldMetaDataWhereInput
  AND: [fieldMetaDataSubscriptionWhereInput!]
  OR: [fieldMetaDataSubscriptionWhereInput!]
  NOT: [fieldMetaDataSubscriptionWhereInput!]
}

input fieldMetaDataUpdatefoundInInput {
  set: [DataSource!]
}

input fieldMetaDataUpdateInput {
  name: String
  foundIn: fieldMetaDataUpdatefoundInInput
  xhrMetaData: XhrMetaDataUpdateOneInput
  scriptMetaData: ScriptMetaDataUpdateOneInput
  htmlMetaData: HtmlMetaDataUpdateOneInput
}

input fieldMetaDataWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  xhrMetaData: XhrMetaDataWhereInput
  scriptMetaData: ScriptMetaDataWhereInput
  htmlMetaData: HtmlMetaDataWhereInput
  AND: [fieldMetaDataWhereInput!]
  OR: [fieldMetaDataWhereInput!]
  NOT: [fieldMetaDataWhereInput!]
}

input fieldMetaDataWhereUniqueInput {
  id: ID
  name: String
}

type HtmlMetaData {
  id: ID!
  cssSelector: String
  selectedValue: String
  cheerioExpression: String
  transformations(where: TransformationWhereInput, orderBy: TransformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transformation!]
  transformedValue: String
}

type HtmlMetaDataConnection {
  pageInfo: PageInfo!
  edges: [HtmlMetaDataEdge]!
  aggregate: AggregateHtmlMetaData!
}

input HtmlMetaDataCreateInput {
  cssSelector: String
  selectedValue: String
  cheerioExpression: String
  transformations: TransformationCreateManyInput
  transformedValue: String
}

input HtmlMetaDataCreateOneInput {
  create: HtmlMetaDataCreateInput
  connect: HtmlMetaDataWhereUniqueInput
}

type HtmlMetaDataEdge {
  node: HtmlMetaData!
  cursor: String!
}

enum HtmlMetaDataOrderByInput {
  id_ASC
  id_DESC
  cssSelector_ASC
  cssSelector_DESC
  selectedValue_ASC
  selectedValue_DESC
  cheerioExpression_ASC
  cheerioExpression_DESC
  transformedValue_ASC
  transformedValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type HtmlMetaDataPreviousValues {
  id: ID!
  cssSelector: String
  selectedValue: String
  cheerioExpression: String
  transformedValue: String
}

type HtmlMetaDataSubscriptionPayload {
  mutation: MutationType!
  node: HtmlMetaData
  updatedFields: [String!]
  previousValues: HtmlMetaDataPreviousValues
}

input HtmlMetaDataSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HtmlMetaDataWhereInput
  AND: [HtmlMetaDataSubscriptionWhereInput!]
  OR: [HtmlMetaDataSubscriptionWhereInput!]
  NOT: [HtmlMetaDataSubscriptionWhereInput!]
}

input HtmlMetaDataUpdateDataInput {
  cssSelector: String
  selectedValue: String
  cheerioExpression: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input HtmlMetaDataUpdateInput {
  cssSelector: String
  selectedValue: String
  cheerioExpression: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input HtmlMetaDataUpdateOneInput {
  create: HtmlMetaDataCreateInput
  update: HtmlMetaDataUpdateDataInput
  upsert: HtmlMetaDataUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: HtmlMetaDataWhereUniqueInput
}

input HtmlMetaDataUpsertNestedInput {
  update: HtmlMetaDataUpdateDataInput!
  create: HtmlMetaDataCreateInput!
}

input HtmlMetaDataWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  cssSelector: String
  cssSelector_not: String
  cssSelector_in: [String!]
  cssSelector_not_in: [String!]
  cssSelector_lt: String
  cssSelector_lte: String
  cssSelector_gt: String
  cssSelector_gte: String
  cssSelector_contains: String
  cssSelector_not_contains: String
  cssSelector_starts_with: String
  cssSelector_not_starts_with: String
  cssSelector_ends_with: String
  cssSelector_not_ends_with: String
  selectedValue: String
  selectedValue_not: String
  selectedValue_in: [String!]
  selectedValue_not_in: [String!]
  selectedValue_lt: String
  selectedValue_lte: String
  selectedValue_gt: String
  selectedValue_gte: String
  selectedValue_contains: String
  selectedValue_not_contains: String
  selectedValue_starts_with: String
  selectedValue_not_starts_with: String
  selectedValue_ends_with: String
  selectedValue_not_ends_with: String
  cheerioExpression: String
  cheerioExpression_not: String
  cheerioExpression_in: [String!]
  cheerioExpression_not_in: [String!]
  cheerioExpression_lt: String
  cheerioExpression_lte: String
  cheerioExpression_gt: String
  cheerioExpression_gte: String
  cheerioExpression_contains: String
  cheerioExpression_not_contains: String
  cheerioExpression_starts_with: String
  cheerioExpression_not_starts_with: String
  cheerioExpression_ends_with: String
  cheerioExpression_not_ends_with: String
  transformations_every: TransformationWhereInput
  transformations_some: TransformationWhereInput
  transformations_none: TransformationWhereInput
  transformedValue: String
  transformedValue_not: String
  transformedValue_in: [String!]
  transformedValue_not_in: [String!]
  transformedValue_lt: String
  transformedValue_lte: String
  transformedValue_gt: String
  transformedValue_gte: String
  transformedValue_contains: String
  transformedValue_not_contains: String
  transformedValue_starts_with: String
  transformedValue_not_starts_with: String
  transformedValue_ends_with: String
  transformedValue_not_ends_with: String
  AND: [HtmlMetaDataWhereInput!]
  OR: [HtmlMetaDataWhereInput!]
  NOT: [HtmlMetaDataWhereInput!]
}

input HtmlMetaDataWhereUniqueInput {
  id: ID
}

scalar Json

scalar Long

type Mutation {
  createHtmlMetaData(data: HtmlMetaDataCreateInput!): HtmlMetaData!
  updateHtmlMetaData(data: HtmlMetaDataUpdateInput!, where: HtmlMetaDataWhereUniqueInput!): HtmlMetaData
  updateManyHtmlMetaDatas(data: HtmlMetaDataUpdateInput!, where: HtmlMetaDataWhereInput): BatchPayload!
  upsertHtmlMetaData(where: HtmlMetaDataWhereUniqueInput!, create: HtmlMetaDataCreateInput!, update: HtmlMetaDataUpdateInput!): HtmlMetaData!
  deleteHtmlMetaData(where: HtmlMetaDataWhereUniqueInput!): HtmlMetaData
  deleteManyHtmlMetaDatas(where: HtmlMetaDataWhereInput): BatchPayload!
  createProductFetcher(data: ProductFetcherCreateInput!): ProductFetcher!
  updateProductFetcher(data: ProductFetcherUpdateInput!, where: ProductFetcherWhereUniqueInput!): ProductFetcher
  updateManyProductFetchers(data: ProductFetcherUpdateInput!, where: ProductFetcherWhereInput): BatchPayload!
  upsertProductFetcher(where: ProductFetcherWhereUniqueInput!, create: ProductFetcherCreateInput!, update: ProductFetcherUpdateInput!): ProductFetcher!
  deleteProductFetcher(where: ProductFetcherWhereUniqueInput!): ProductFetcher
  deleteManyProductFetchers(where: ProductFetcherWhereInput): BatchPayload!
  createProductObservation(data: ProductObservationCreateInput!): ProductObservation!
  updateProductObservation(data: ProductObservationUpdateInput!, where: ProductObservationWhereUniqueInput!): ProductObservation
  updateManyProductObservations(data: ProductObservationUpdateInput!, where: ProductObservationWhereInput): BatchPayload!
  upsertProductObservation(where: ProductObservationWhereUniqueInput!, create: ProductObservationCreateInput!, update: ProductObservationUpdateInput!): ProductObservation!
  deleteProductObservation(where: ProductObservationWhereUniqueInput!): ProductObservation
  deleteManyProductObservations(where: ProductObservationWhereInput): BatchPayload!
  createProductPage(data: ProductPageCreateInput!): ProductPage!
  updateProductPage(data: ProductPageUpdateInput!, where: ProductPageWhereUniqueInput!): ProductPage
  updateManyProductPages(data: ProductPageUpdateInput!, where: ProductPageWhereInput): BatchPayload!
  upsertProductPage(where: ProductPageWhereUniqueInput!, create: ProductPageCreateInput!, update: ProductPageUpdateInput!): ProductPage!
  deleteProductPage(where: ProductPageWhereUniqueInput!): ProductPage
  deleteManyProductPages(where: ProductPageWhereInput): BatchPayload!
  createRelatedProduct(data: RelatedProductCreateInput!): RelatedProduct!
  updateRelatedProduct(data: RelatedProductUpdateInput!, where: RelatedProductWhereUniqueInput!): RelatedProduct
  updateManyRelatedProducts(data: RelatedProductUpdateInput!, where: RelatedProductWhereInput): BatchPayload!
  upsertRelatedProduct(where: RelatedProductWhereUniqueInput!, create: RelatedProductCreateInput!, update: RelatedProductUpdateInput!): RelatedProduct!
  deleteRelatedProduct(where: RelatedProductWhereUniqueInput!): RelatedProduct
  deleteManyRelatedProducts(where: RelatedProductWhereInput): BatchPayload!
  createScriptMetaData(data: ScriptMetaDataCreateInput!): ScriptMetaData!
  updateScriptMetaData(data: ScriptMetaDataUpdateInput!, where: ScriptMetaDataWhereUniqueInput!): ScriptMetaData
  updateManyScriptMetaDatas(data: ScriptMetaDataUpdateInput!, where: ScriptMetaDataWhereInput): BatchPayload!
  upsertScriptMetaData(where: ScriptMetaDataWhereUniqueInput!, create: ScriptMetaDataCreateInput!, update: ScriptMetaDataUpdateInput!): ScriptMetaData!
  deleteScriptMetaData(where: ScriptMetaDataWhereUniqueInput!): ScriptMetaData
  deleteManyScriptMetaDatas(where: ScriptMetaDataWhereInput): BatchPayload!
  createSimilarProduct(data: SimilarProductCreateInput!): SimilarProduct!
  updateSimilarProduct(data: SimilarProductUpdateInput!, where: SimilarProductWhereUniqueInput!): SimilarProduct
  updateManySimilarProducts(data: SimilarProductUpdateInput!, where: SimilarProductWhereInput): BatchPayload!
  upsertSimilarProduct(where: SimilarProductWhereUniqueInput!, create: SimilarProductCreateInput!, update: SimilarProductUpdateInput!): SimilarProduct!
  deleteSimilarProduct(where: SimilarProductWhereUniqueInput!): SimilarProduct
  deleteManySimilarProducts(where: SimilarProductWhereInput): BatchPayload!
  createStore(data: StoreCreateInput!): Store!
  updateStore(data: StoreUpdateInput!, where: StoreWhereUniqueInput!): Store
  updateManyStores(data: StoreUpdateInput!, where: StoreWhereInput): BatchPayload!
  upsertStore(where: StoreWhereUniqueInput!, create: StoreCreateInput!, update: StoreUpdateInput!): Store!
  deleteStore(where: StoreWhereUniqueInput!): Store
  deleteManyStores(where: StoreWhereInput): BatchPayload!
  createTransformation(data: TransformationCreateInput!): Transformation!
  updateTransformation(data: TransformationUpdateInput!, where: TransformationWhereUniqueInput!): Transformation
  updateManyTransformations(data: TransformationUpdateInput!, where: TransformationWhereInput): BatchPayload!
  upsertTransformation(where: TransformationWhereUniqueInput!, create: TransformationCreateInput!, update: TransformationUpdateInput!): Transformation!
  deleteTransformation(where: TransformationWhereUniqueInput!): Transformation
  deleteManyTransformations(where: TransformationWhereInput): BatchPayload!
  createXhrMetaData(data: XhrMetaDataCreateInput!): XhrMetaData!
  updateXhrMetaData(data: XhrMetaDataUpdateInput!, where: XhrMetaDataWhereUniqueInput!): XhrMetaData
  updateManyXhrMetaDatas(data: XhrMetaDataUpdateInput!, where: XhrMetaDataWhereInput): BatchPayload!
  upsertXhrMetaData(where: XhrMetaDataWhereUniqueInput!, create: XhrMetaDataCreateInput!, update: XhrMetaDataUpdateInput!): XhrMetaData!
  deleteXhrMetaData(where: XhrMetaDataWhereUniqueInput!): XhrMetaData
  deleteManyXhrMetaDatas(where: XhrMetaDataWhereInput): BatchPayload!
  createfieldMetaData(data: fieldMetaDataCreateInput!): fieldMetaData!
  updatefieldMetaData(data: fieldMetaDataUpdateInput!, where: fieldMetaDataWhereUniqueInput!): fieldMetaData
  updateManyfieldMetaDatas(data: fieldMetaDataUpdateInput!, where: fieldMetaDataWhereInput): BatchPayload!
  upsertfieldMetaData(where: fieldMetaDataWhereUniqueInput!, create: fieldMetaDataCreateInput!, update: fieldMetaDataUpdateInput!): fieldMetaData!
  deletefieldMetaData(where: fieldMetaDataWhereUniqueInput!): fieldMetaData
  deleteManyfieldMetaDatas(where: fieldMetaDataWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type ProductFetcher {
  id: ID!
  generatedCode: String
  productObservation: ProductObservation
  isCompleted: Boolean
}

type ProductFetcherConnection {
  pageInfo: PageInfo!
  edges: [ProductFetcherEdge]!
  aggregate: AggregateProductFetcher!
}

input ProductFetcherCreateInput {
  generatedCode: String
  productObservation: ProductObservationCreateOneInput
  isCompleted: Boolean
}

input ProductFetcherCreateOneInput {
  create: ProductFetcherCreateInput
  connect: ProductFetcherWhereUniqueInput
}

type ProductFetcherEdge {
  node: ProductFetcher!
  cursor: String!
}

enum ProductFetcherOrderByInput {
  id_ASC
  id_DESC
  generatedCode_ASC
  generatedCode_DESC
  isCompleted_ASC
  isCompleted_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProductFetcherPreviousValues {
  id: ID!
  generatedCode: String
  isCompleted: Boolean
}

type ProductFetcherSubscriptionPayload {
  mutation: MutationType!
  node: ProductFetcher
  updatedFields: [String!]
  previousValues: ProductFetcherPreviousValues
}

input ProductFetcherSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductFetcherWhereInput
  AND: [ProductFetcherSubscriptionWhereInput!]
  OR: [ProductFetcherSubscriptionWhereInput!]
  NOT: [ProductFetcherSubscriptionWhereInput!]
}

input ProductFetcherUpdateDataInput {
  generatedCode: String
  productObservation: ProductObservationUpdateOneInput
  isCompleted: Boolean
}

input ProductFetcherUpdateInput {
  generatedCode: String
  productObservation: ProductObservationUpdateOneInput
  isCompleted: Boolean
}

input ProductFetcherUpdateOneInput {
  create: ProductFetcherCreateInput
  update: ProductFetcherUpdateDataInput
  upsert: ProductFetcherUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ProductFetcherWhereUniqueInput
}

input ProductFetcherUpsertNestedInput {
  update: ProductFetcherUpdateDataInput!
  create: ProductFetcherCreateInput!
}

input ProductFetcherWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  generatedCode: String
  generatedCode_not: String
  generatedCode_in: [String!]
  generatedCode_not_in: [String!]
  generatedCode_lt: String
  generatedCode_lte: String
  generatedCode_gt: String
  generatedCode_gte: String
  generatedCode_contains: String
  generatedCode_not_contains: String
  generatedCode_starts_with: String
  generatedCode_not_starts_with: String
  generatedCode_ends_with: String
  generatedCode_not_ends_with: String
  productObservation: ProductObservationWhereInput
  isCompleted: Boolean
  isCompleted_not: Boolean
  AND: [ProductFetcherWhereInput!]
  OR: [ProductFetcherWhereInput!]
  NOT: [ProductFetcherWhereInput!]
}

input ProductFetcherWhereUniqueInput {
  id: ID
}

type ProductObservation {
  id: ID!
  vimVersion: String
  schemaVersion: String
  parentId: String
  variantId: String
  imprint: Boolean
  title: String
  brand: String
  description: String
  extDescription: String
  imageUrlPrimary: String
  imageUrlSecondaries: [String!]!
  productDetails: Json
  productStates: [ProductState!]!
  ratingCount: Int
  ratingValue: Int
  keywords: [String!]!
  categories: [String!]!
  upc: String
  priceCurrent: Float
  priceList: Float
  currency: String
  inStock: Boolean!
  isCanoncial: Boolean
  canonicalUrl: String
  storeExtraInfo: Json
  relatedProducts(where: RelatedProductWhereInput, orderBy: RelatedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RelatedProduct!]
  similarProducts(where: SimilarProductWhereInput, orderBy: SimilarProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SimilarProduct!]
  quantityInStock: Int
  quantityRequired: Int
  quantityAllowed: Int
  quantityIncrement: Int
  finalSale: Boolean
  deals: String
}

type ProductObservationConnection {
  pageInfo: PageInfo!
  edges: [ProductObservationEdge]!
  aggregate: AggregateProductObservation!
}

input ProductObservationCreatecategoriesInput {
  set: [String!]
}

input ProductObservationCreateimageUrlSecondariesInput {
  set: [String!]
}

input ProductObservationCreateInput {
  vimVersion: String
  schemaVersion: String
  parentId: String
  variantId: String
  imprint: Boolean
  title: String
  brand: String
  description: String
  extDescription: String
  imageUrlPrimary: String
  imageUrlSecondaries: ProductObservationCreateimageUrlSecondariesInput
  productDetails: Json
  productStates: ProductObservationCreateproductStatesInput
  ratingCount: Int
  ratingValue: Int
  keywords: ProductObservationCreatekeywordsInput
  categories: ProductObservationCreatecategoriesInput
  upc: String
  priceCurrent: Float
  priceList: Float
  currency: String
  inStock: Boolean
  isCanoncial: Boolean
  canonicalUrl: String
  storeExtraInfo: Json
  relatedProducts: RelatedProductCreateManyInput
  similarProducts: SimilarProductCreateManyInput
  quantityInStock: Int
  quantityRequired: Int
  quantityAllowed: Int
  quantityIncrement: Int
  finalSale: Boolean
  deals: String
}

input ProductObservationCreatekeywordsInput {
  set: [String!]
}

input ProductObservationCreateOneInput {
  create: ProductObservationCreateInput
  connect: ProductObservationWhereUniqueInput
}

input ProductObservationCreateproductStatesInput {
  set: [ProductState!]
}

type ProductObservationEdge {
  node: ProductObservation!
  cursor: String!
}

enum ProductObservationOrderByInput {
  id_ASC
  id_DESC
  vimVersion_ASC
  vimVersion_DESC
  schemaVersion_ASC
  schemaVersion_DESC
  parentId_ASC
  parentId_DESC
  variantId_ASC
  variantId_DESC
  imprint_ASC
  imprint_DESC
  title_ASC
  title_DESC
  brand_ASC
  brand_DESC
  description_ASC
  description_DESC
  extDescription_ASC
  extDescription_DESC
  imageUrlPrimary_ASC
  imageUrlPrimary_DESC
  productDetails_ASC
  productDetails_DESC
  ratingCount_ASC
  ratingCount_DESC
  ratingValue_ASC
  ratingValue_DESC
  upc_ASC
  upc_DESC
  priceCurrent_ASC
  priceCurrent_DESC
  priceList_ASC
  priceList_DESC
  currency_ASC
  currency_DESC
  inStock_ASC
  inStock_DESC
  isCanoncial_ASC
  isCanoncial_DESC
  canonicalUrl_ASC
  canonicalUrl_DESC
  storeExtraInfo_ASC
  storeExtraInfo_DESC
  quantityInStock_ASC
  quantityInStock_DESC
  quantityRequired_ASC
  quantityRequired_DESC
  quantityAllowed_ASC
  quantityAllowed_DESC
  quantityIncrement_ASC
  quantityIncrement_DESC
  finalSale_ASC
  finalSale_DESC
  deals_ASC
  deals_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProductObservationPreviousValues {
  id: ID!
  vimVersion: String
  schemaVersion: String
  parentId: String
  variantId: String
  imprint: Boolean
  title: String
  brand: String
  description: String
  extDescription: String
  imageUrlPrimary: String
  imageUrlSecondaries: [String!]!
  productDetails: Json
  productStates: [ProductState!]!
  ratingCount: Int
  ratingValue: Int
  keywords: [String!]!
  categories: [String!]!
  upc: String
  priceCurrent: Float
  priceList: Float
  currency: String
  inStock: Boolean!
  isCanoncial: Boolean
  canonicalUrl: String
  storeExtraInfo: Json
  quantityInStock: Int
  quantityRequired: Int
  quantityAllowed: Int
  quantityIncrement: Int
  finalSale: Boolean
  deals: String
}

type ProductObservationSubscriptionPayload {
  mutation: MutationType!
  node: ProductObservation
  updatedFields: [String!]
  previousValues: ProductObservationPreviousValues
}

input ProductObservationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductObservationWhereInput
  AND: [ProductObservationSubscriptionWhereInput!]
  OR: [ProductObservationSubscriptionWhereInput!]
  NOT: [ProductObservationSubscriptionWhereInput!]
}

input ProductObservationUpdatecategoriesInput {
  set: [String!]
}

input ProductObservationUpdateDataInput {
  vimVersion: String
  schemaVersion: String
  parentId: String
  variantId: String
  imprint: Boolean
  title: String
  brand: String
  description: String
  extDescription: String
  imageUrlPrimary: String
  imageUrlSecondaries: ProductObservationUpdateimageUrlSecondariesInput
  productDetails: Json
  productStates: ProductObservationUpdateproductStatesInput
  ratingCount: Int
  ratingValue: Int
  keywords: ProductObservationUpdatekeywordsInput
  categories: ProductObservationUpdatecategoriesInput
  upc: String
  priceCurrent: Float
  priceList: Float
  currency: String
  inStock: Boolean
  isCanoncial: Boolean
  canonicalUrl: String
  storeExtraInfo: Json
  relatedProducts: RelatedProductUpdateManyInput
  similarProducts: SimilarProductUpdateManyInput
  quantityInStock: Int
  quantityRequired: Int
  quantityAllowed: Int
  quantityIncrement: Int
  finalSale: Boolean
  deals: String
}

input ProductObservationUpdateimageUrlSecondariesInput {
  set: [String!]
}

input ProductObservationUpdateInput {
  vimVersion: String
  schemaVersion: String
  parentId: String
  variantId: String
  imprint: Boolean
  title: String
  brand: String
  description: String
  extDescription: String
  imageUrlPrimary: String
  imageUrlSecondaries: ProductObservationUpdateimageUrlSecondariesInput
  productDetails: Json
  productStates: ProductObservationUpdateproductStatesInput
  ratingCount: Int
  ratingValue: Int
  keywords: ProductObservationUpdatekeywordsInput
  categories: ProductObservationUpdatecategoriesInput
  upc: String
  priceCurrent: Float
  priceList: Float
  currency: String
  inStock: Boolean
  isCanoncial: Boolean
  canonicalUrl: String
  storeExtraInfo: Json
  relatedProducts: RelatedProductUpdateManyInput
  similarProducts: SimilarProductUpdateManyInput
  quantityInStock: Int
  quantityRequired: Int
  quantityAllowed: Int
  quantityIncrement: Int
  finalSale: Boolean
  deals: String
}

input ProductObservationUpdatekeywordsInput {
  set: [String!]
}

input ProductObservationUpdateOneInput {
  create: ProductObservationCreateInput
  update: ProductObservationUpdateDataInput
  upsert: ProductObservationUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ProductObservationWhereUniqueInput
}

input ProductObservationUpdateproductStatesInput {
  set: [ProductState!]
}

input ProductObservationUpsertNestedInput {
  update: ProductObservationUpdateDataInput!
  create: ProductObservationCreateInput!
}

input ProductObservationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  vimVersion: String
  vimVersion_not: String
  vimVersion_in: [String!]
  vimVersion_not_in: [String!]
  vimVersion_lt: String
  vimVersion_lte: String
  vimVersion_gt: String
  vimVersion_gte: String
  vimVersion_contains: String
  vimVersion_not_contains: String
  vimVersion_starts_with: String
  vimVersion_not_starts_with: String
  vimVersion_ends_with: String
  vimVersion_not_ends_with: String
  schemaVersion: String
  schemaVersion_not: String
  schemaVersion_in: [String!]
  schemaVersion_not_in: [String!]
  schemaVersion_lt: String
  schemaVersion_lte: String
  schemaVersion_gt: String
  schemaVersion_gte: String
  schemaVersion_contains: String
  schemaVersion_not_contains: String
  schemaVersion_starts_with: String
  schemaVersion_not_starts_with: String
  schemaVersion_ends_with: String
  schemaVersion_not_ends_with: String
  parentId: String
  parentId_not: String
  parentId_in: [String!]
  parentId_not_in: [String!]
  parentId_lt: String
  parentId_lte: String
  parentId_gt: String
  parentId_gte: String
  parentId_contains: String
  parentId_not_contains: String
  parentId_starts_with: String
  parentId_not_starts_with: String
  parentId_ends_with: String
  parentId_not_ends_with: String
  variantId: String
  variantId_not: String
  variantId_in: [String!]
  variantId_not_in: [String!]
  variantId_lt: String
  variantId_lte: String
  variantId_gt: String
  variantId_gte: String
  variantId_contains: String
  variantId_not_contains: String
  variantId_starts_with: String
  variantId_not_starts_with: String
  variantId_ends_with: String
  variantId_not_ends_with: String
  imprint: Boolean
  imprint_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  brand: String
  brand_not: String
  brand_in: [String!]
  brand_not_in: [String!]
  brand_lt: String
  brand_lte: String
  brand_gt: String
  brand_gte: String
  brand_contains: String
  brand_not_contains: String
  brand_starts_with: String
  brand_not_starts_with: String
  brand_ends_with: String
  brand_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  extDescription: String
  extDescription_not: String
  extDescription_in: [String!]
  extDescription_not_in: [String!]
  extDescription_lt: String
  extDescription_lte: String
  extDescription_gt: String
  extDescription_gte: String
  extDescription_contains: String
  extDescription_not_contains: String
  extDescription_starts_with: String
  extDescription_not_starts_with: String
  extDescription_ends_with: String
  extDescription_not_ends_with: String
  imageUrlPrimary: String
  imageUrlPrimary_not: String
  imageUrlPrimary_in: [String!]
  imageUrlPrimary_not_in: [String!]
  imageUrlPrimary_lt: String
  imageUrlPrimary_lte: String
  imageUrlPrimary_gt: String
  imageUrlPrimary_gte: String
  imageUrlPrimary_contains: String
  imageUrlPrimary_not_contains: String
  imageUrlPrimary_starts_with: String
  imageUrlPrimary_not_starts_with: String
  imageUrlPrimary_ends_with: String
  imageUrlPrimary_not_ends_with: String
  ratingCount: Int
  ratingCount_not: Int
  ratingCount_in: [Int!]
  ratingCount_not_in: [Int!]
  ratingCount_lt: Int
  ratingCount_lte: Int
  ratingCount_gt: Int
  ratingCount_gte: Int
  ratingValue: Int
  ratingValue_not: Int
  ratingValue_in: [Int!]
  ratingValue_not_in: [Int!]
  ratingValue_lt: Int
  ratingValue_lte: Int
  ratingValue_gt: Int
  ratingValue_gte: Int
  upc: String
  upc_not: String
  upc_in: [String!]
  upc_not_in: [String!]
  upc_lt: String
  upc_lte: String
  upc_gt: String
  upc_gte: String
  upc_contains: String
  upc_not_contains: String
  upc_starts_with: String
  upc_not_starts_with: String
  upc_ends_with: String
  upc_not_ends_with: String
  priceCurrent: Float
  priceCurrent_not: Float
  priceCurrent_in: [Float!]
  priceCurrent_not_in: [Float!]
  priceCurrent_lt: Float
  priceCurrent_lte: Float
  priceCurrent_gt: Float
  priceCurrent_gte: Float
  priceList: Float
  priceList_not: Float
  priceList_in: [Float!]
  priceList_not_in: [Float!]
  priceList_lt: Float
  priceList_lte: Float
  priceList_gt: Float
  priceList_gte: Float
  currency: String
  currency_not: String
  currency_in: [String!]
  currency_not_in: [String!]
  currency_lt: String
  currency_lte: String
  currency_gt: String
  currency_gte: String
  currency_contains: String
  currency_not_contains: String
  currency_starts_with: String
  currency_not_starts_with: String
  currency_ends_with: String
  currency_not_ends_with: String
  inStock: Boolean
  inStock_not: Boolean
  isCanoncial: Boolean
  isCanoncial_not: Boolean
  canonicalUrl: String
  canonicalUrl_not: String
  canonicalUrl_in: [String!]
  canonicalUrl_not_in: [String!]
  canonicalUrl_lt: String
  canonicalUrl_lte: String
  canonicalUrl_gt: String
  canonicalUrl_gte: String
  canonicalUrl_contains: String
  canonicalUrl_not_contains: String
  canonicalUrl_starts_with: String
  canonicalUrl_not_starts_with: String
  canonicalUrl_ends_with: String
  canonicalUrl_not_ends_with: String
  relatedProducts_every: RelatedProductWhereInput
  relatedProducts_some: RelatedProductWhereInput
  relatedProducts_none: RelatedProductWhereInput
  similarProducts_every: SimilarProductWhereInput
  similarProducts_some: SimilarProductWhereInput
  similarProducts_none: SimilarProductWhereInput
  quantityInStock: Int
  quantityInStock_not: Int
  quantityInStock_in: [Int!]
  quantityInStock_not_in: [Int!]
  quantityInStock_lt: Int
  quantityInStock_lte: Int
  quantityInStock_gt: Int
  quantityInStock_gte: Int
  quantityRequired: Int
  quantityRequired_not: Int
  quantityRequired_in: [Int!]
  quantityRequired_not_in: [Int!]
  quantityRequired_lt: Int
  quantityRequired_lte: Int
  quantityRequired_gt: Int
  quantityRequired_gte: Int
  quantityAllowed: Int
  quantityAllowed_not: Int
  quantityAllowed_in: [Int!]
  quantityAllowed_not_in: [Int!]
  quantityAllowed_lt: Int
  quantityAllowed_lte: Int
  quantityAllowed_gt: Int
  quantityAllowed_gte: Int
  quantityIncrement: Int
  quantityIncrement_not: Int
  quantityIncrement_in: [Int!]
  quantityIncrement_not_in: [Int!]
  quantityIncrement_lt: Int
  quantityIncrement_lte: Int
  quantityIncrement_gt: Int
  quantityIncrement_gte: Int
  finalSale: Boolean
  finalSale_not: Boolean
  deals: String
  deals_not: String
  deals_in: [String!]
  deals_not_in: [String!]
  deals_lt: String
  deals_lte: String
  deals_gt: String
  deals_gte: String
  deals_contains: String
  deals_not_contains: String
  deals_starts_with: String
  deals_not_starts_with: String
  deals_ends_with: String
  deals_not_ends_with: String
  AND: [ProductObservationWhereInput!]
  OR: [ProductObservationWhereInput!]
  NOT: [ProductObservationWhereInput!]
}

input ProductObservationWhereUniqueInput {
  id: ID
}

type ProductPage {
  id: ID!
  url: String!
  regex: String
}

type ProductPageConnection {
  pageInfo: PageInfo!
  edges: [ProductPageEdge]!
  aggregate: AggregateProductPage!
}

input ProductPageCreateInput {
  url: String!
  regex: String
}

input ProductPageCreateManyInput {
  create: [ProductPageCreateInput!]
  connect: [ProductPageWhereUniqueInput!]
}

type ProductPageEdge {
  node: ProductPage!
  cursor: String!
}

enum ProductPageOrderByInput {
  id_ASC
  id_DESC
  url_ASC
  url_DESC
  regex_ASC
  regex_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProductPagePreviousValues {
  id: ID!
  url: String!
  regex: String
}

type ProductPageSubscriptionPayload {
  mutation: MutationType!
  node: ProductPage
  updatedFields: [String!]
  previousValues: ProductPagePreviousValues
}

input ProductPageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductPageWhereInput
  AND: [ProductPageSubscriptionWhereInput!]
  OR: [ProductPageSubscriptionWhereInput!]
  NOT: [ProductPageSubscriptionWhereInput!]
}

input ProductPageUpdateDataInput {
  url: String
  regex: String
}

input ProductPageUpdateInput {
  url: String
  regex: String
}

input ProductPageUpdateManyInput {
  create: [ProductPageCreateInput!]
  update: [ProductPageUpdateWithWhereUniqueNestedInput!]
  upsert: [ProductPageUpsertWithWhereUniqueNestedInput!]
  delete: [ProductPageWhereUniqueInput!]
  connect: [ProductPageWhereUniqueInput!]
  disconnect: [ProductPageWhereUniqueInput!]
}

input ProductPageUpdateWithWhereUniqueNestedInput {
  where: ProductPageWhereUniqueInput!
  data: ProductPageUpdateDataInput!
}

input ProductPageUpsertWithWhereUniqueNestedInput {
  where: ProductPageWhereUniqueInput!
  update: ProductPageUpdateDataInput!
  create: ProductPageCreateInput!
}

input ProductPageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  regex: String
  regex_not: String
  regex_in: [String!]
  regex_not_in: [String!]
  regex_lt: String
  regex_lte: String
  regex_gt: String
  regex_gte: String
  regex_contains: String
  regex_not_contains: String
  regex_starts_with: String
  regex_not_starts_with: String
  regex_ends_with: String
  regex_not_ends_with: String
  AND: [ProductPageWhereInput!]
  OR: [ProductPageWhereInput!]
  NOT: [ProductPageWhereInput!]
}

input ProductPageWhereUniqueInput {
  id: ID
  url: String
}

enum ProductState {
  ISPO
  CS
  TPS
  DIGITAL
  CUZ
}

type Query {
  htmlMetaData(where: HtmlMetaDataWhereUniqueInput!): HtmlMetaData
  htmlMetaDatas(where: HtmlMetaDataWhereInput, orderBy: HtmlMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [HtmlMetaData]!
  htmlMetaDatasConnection(where: HtmlMetaDataWhereInput, orderBy: HtmlMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HtmlMetaDataConnection!
  productFetcher(where: ProductFetcherWhereUniqueInput!): ProductFetcher
  productFetchers(where: ProductFetcherWhereInput, orderBy: ProductFetcherOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProductFetcher]!
  productFetchersConnection(where: ProductFetcherWhereInput, orderBy: ProductFetcherOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductFetcherConnection!
  productObservation(where: ProductObservationWhereUniqueInput!): ProductObservation
  productObservations(where: ProductObservationWhereInput, orderBy: ProductObservationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProductObservation]!
  productObservationsConnection(where: ProductObservationWhereInput, orderBy: ProductObservationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductObservationConnection!
  productPage(where: ProductPageWhereUniqueInput!): ProductPage
  productPages(where: ProductPageWhereInput, orderBy: ProductPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProductPage]!
  productPagesConnection(where: ProductPageWhereInput, orderBy: ProductPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductPageConnection!
  relatedProduct(where: RelatedProductWhereUniqueInput!): RelatedProduct
  relatedProducts(where: RelatedProductWhereInput, orderBy: RelatedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RelatedProduct]!
  relatedProductsConnection(where: RelatedProductWhereInput, orderBy: RelatedProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RelatedProductConnection!
  scriptMetaData(where: ScriptMetaDataWhereUniqueInput!): ScriptMetaData
  scriptMetaDatas(where: ScriptMetaDataWhereInput, orderBy: ScriptMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ScriptMetaData]!
  scriptMetaDatasConnection(where: ScriptMetaDataWhereInput, orderBy: ScriptMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ScriptMetaDataConnection!
  similarProduct(where: SimilarProductWhereUniqueInput!): SimilarProduct
  similarProducts(where: SimilarProductWhereInput, orderBy: SimilarProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SimilarProduct]!
  similarProductsConnection(where: SimilarProductWhereInput, orderBy: SimilarProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SimilarProductConnection!
  store(where: StoreWhereUniqueInput!): Store
  stores(where: StoreWhereInput, orderBy: StoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Store]!
  storesConnection(where: StoreWhereInput, orderBy: StoreOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StoreConnection!
  transformation(where: TransformationWhereUniqueInput!): Transformation
  transformations(where: TransformationWhereInput, orderBy: TransformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transformation]!
  transformationsConnection(where: TransformationWhereInput, orderBy: TransformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransformationConnection!
  xhrMetaData(where: XhrMetaDataWhereUniqueInput!): XhrMetaData
  xhrMetaDatas(where: XhrMetaDataWhereInput, orderBy: XhrMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [XhrMetaData]!
  xhrMetaDatasConnection(where: XhrMetaDataWhereInput, orderBy: XhrMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): XhrMetaDataConnection!
  fieldMetaData(where: fieldMetaDataWhereUniqueInput!): fieldMetaData
  fieldMetaDatas(where: fieldMetaDataWhereInput, orderBy: fieldMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [fieldMetaData]!
  fieldMetaDatasConnection(where: fieldMetaDataWhereInput, orderBy: fieldMetaDataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): fieldMetaDataConnection!
  node(id: ID!): Node
}

type RelatedProduct {
  id: ID!
  parentId: String
  url: String
}

type RelatedProductConnection {
  pageInfo: PageInfo!
  edges: [RelatedProductEdge]!
  aggregate: AggregateRelatedProduct!
}

input RelatedProductCreateInput {
  parentId: String
  url: String
}

input RelatedProductCreateManyInput {
  create: [RelatedProductCreateInput!]
  connect: [RelatedProductWhereUniqueInput!]
}

type RelatedProductEdge {
  node: RelatedProduct!
  cursor: String!
}

enum RelatedProductOrderByInput {
  id_ASC
  id_DESC
  parentId_ASC
  parentId_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RelatedProductPreviousValues {
  id: ID!
  parentId: String
  url: String
}

type RelatedProductSubscriptionPayload {
  mutation: MutationType!
  node: RelatedProduct
  updatedFields: [String!]
  previousValues: RelatedProductPreviousValues
}

input RelatedProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RelatedProductWhereInput
  AND: [RelatedProductSubscriptionWhereInput!]
  OR: [RelatedProductSubscriptionWhereInput!]
  NOT: [RelatedProductSubscriptionWhereInput!]
}

input RelatedProductUpdateDataInput {
  parentId: String
  url: String
}

input RelatedProductUpdateInput {
  parentId: String
  url: String
}

input RelatedProductUpdateManyInput {
  create: [RelatedProductCreateInput!]
  update: [RelatedProductUpdateWithWhereUniqueNestedInput!]
  upsert: [RelatedProductUpsertWithWhereUniqueNestedInput!]
  delete: [RelatedProductWhereUniqueInput!]
  connect: [RelatedProductWhereUniqueInput!]
  disconnect: [RelatedProductWhereUniqueInput!]
}

input RelatedProductUpdateWithWhereUniqueNestedInput {
  where: RelatedProductWhereUniqueInput!
  data: RelatedProductUpdateDataInput!
}

input RelatedProductUpsertWithWhereUniqueNestedInput {
  where: RelatedProductWhereUniqueInput!
  update: RelatedProductUpdateDataInput!
  create: RelatedProductCreateInput!
}

input RelatedProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  parentId: String
  parentId_not: String
  parentId_in: [String!]
  parentId_not_in: [String!]
  parentId_lt: String
  parentId_lte: String
  parentId_gt: String
  parentId_gte: String
  parentId_contains: String
  parentId_not_contains: String
  parentId_starts_with: String
  parentId_not_starts_with: String
  parentId_ends_with: String
  parentId_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [RelatedProductWhereInput!]
  OR: [RelatedProductWhereInput!]
  NOT: [RelatedProductWhereInput!]
}

input RelatedProductWhereUniqueInput {
  id: ID
  url: String
}

type ScriptMetaData {
  id: ID!
  script: Json
  regex: String
  propertyPath: String
  transformations(where: TransformationWhereInput, orderBy: TransformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transformation!]
  transformedValue: String
}

type ScriptMetaDataConnection {
  pageInfo: PageInfo!
  edges: [ScriptMetaDataEdge]!
  aggregate: AggregateScriptMetaData!
}

input ScriptMetaDataCreateInput {
  script: Json
  regex: String
  propertyPath: String
  transformations: TransformationCreateManyInput
  transformedValue: String
}

input ScriptMetaDataCreateOneInput {
  create: ScriptMetaDataCreateInput
  connect: ScriptMetaDataWhereUniqueInput
}

type ScriptMetaDataEdge {
  node: ScriptMetaData!
  cursor: String!
}

enum ScriptMetaDataOrderByInput {
  id_ASC
  id_DESC
  script_ASC
  script_DESC
  regex_ASC
  regex_DESC
  propertyPath_ASC
  propertyPath_DESC
  transformedValue_ASC
  transformedValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ScriptMetaDataPreviousValues {
  id: ID!
  script: Json
  regex: String
  propertyPath: String
  transformedValue: String
}

type ScriptMetaDataSubscriptionPayload {
  mutation: MutationType!
  node: ScriptMetaData
  updatedFields: [String!]
  previousValues: ScriptMetaDataPreviousValues
}

input ScriptMetaDataSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ScriptMetaDataWhereInput
  AND: [ScriptMetaDataSubscriptionWhereInput!]
  OR: [ScriptMetaDataSubscriptionWhereInput!]
  NOT: [ScriptMetaDataSubscriptionWhereInput!]
}

input ScriptMetaDataUpdateDataInput {
  script: Json
  regex: String
  propertyPath: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input ScriptMetaDataUpdateInput {
  script: Json
  regex: String
  propertyPath: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input ScriptMetaDataUpdateOneInput {
  create: ScriptMetaDataCreateInput
  update: ScriptMetaDataUpdateDataInput
  upsert: ScriptMetaDataUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ScriptMetaDataWhereUniqueInput
}

input ScriptMetaDataUpsertNestedInput {
  update: ScriptMetaDataUpdateDataInput!
  create: ScriptMetaDataCreateInput!
}

input ScriptMetaDataWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  regex: String
  regex_not: String
  regex_in: [String!]
  regex_not_in: [String!]
  regex_lt: String
  regex_lte: String
  regex_gt: String
  regex_gte: String
  regex_contains: String
  regex_not_contains: String
  regex_starts_with: String
  regex_not_starts_with: String
  regex_ends_with: String
  regex_not_ends_with: String
  propertyPath: String
  propertyPath_not: String
  propertyPath_in: [String!]
  propertyPath_not_in: [String!]
  propertyPath_lt: String
  propertyPath_lte: String
  propertyPath_gt: String
  propertyPath_gte: String
  propertyPath_contains: String
  propertyPath_not_contains: String
  propertyPath_starts_with: String
  propertyPath_not_starts_with: String
  propertyPath_ends_with: String
  propertyPath_not_ends_with: String
  transformations_every: TransformationWhereInput
  transformations_some: TransformationWhereInput
  transformations_none: TransformationWhereInput
  transformedValue: String
  transformedValue_not: String
  transformedValue_in: [String!]
  transformedValue_not_in: [String!]
  transformedValue_lt: String
  transformedValue_lte: String
  transformedValue_gt: String
  transformedValue_gte: String
  transformedValue_contains: String
  transformedValue_not_contains: String
  transformedValue_starts_with: String
  transformedValue_not_starts_with: String
  transformedValue_ends_with: String
  transformedValue_not_ends_with: String
  AND: [ScriptMetaDataWhereInput!]
  OR: [ScriptMetaDataWhereInput!]
  NOT: [ScriptMetaDataWhereInput!]
}

input ScriptMetaDataWhereUniqueInput {
  id: ID
}

type SimilarProduct {
  id: ID!
  parentId: String
  url: String
}

type SimilarProductConnection {
  pageInfo: PageInfo!
  edges: [SimilarProductEdge]!
  aggregate: AggregateSimilarProduct!
}

input SimilarProductCreateInput {
  parentId: String
  url: String
}

input SimilarProductCreateManyInput {
  create: [SimilarProductCreateInput!]
  connect: [SimilarProductWhereUniqueInput!]
}

type SimilarProductEdge {
  node: SimilarProduct!
  cursor: String!
}

enum SimilarProductOrderByInput {
  id_ASC
  id_DESC
  parentId_ASC
  parentId_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SimilarProductPreviousValues {
  id: ID!
  parentId: String
  url: String
}

type SimilarProductSubscriptionPayload {
  mutation: MutationType!
  node: SimilarProduct
  updatedFields: [String!]
  previousValues: SimilarProductPreviousValues
}

input SimilarProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SimilarProductWhereInput
  AND: [SimilarProductSubscriptionWhereInput!]
  OR: [SimilarProductSubscriptionWhereInput!]
  NOT: [SimilarProductSubscriptionWhereInput!]
}

input SimilarProductUpdateDataInput {
  parentId: String
  url: String
}

input SimilarProductUpdateInput {
  parentId: String
  url: String
}

input SimilarProductUpdateManyInput {
  create: [SimilarProductCreateInput!]
  update: [SimilarProductUpdateWithWhereUniqueNestedInput!]
  upsert: [SimilarProductUpsertWithWhereUniqueNestedInput!]
  delete: [SimilarProductWhereUniqueInput!]
  connect: [SimilarProductWhereUniqueInput!]
  disconnect: [SimilarProductWhereUniqueInput!]
}

input SimilarProductUpdateWithWhereUniqueNestedInput {
  where: SimilarProductWhereUniqueInput!
  data: SimilarProductUpdateDataInput!
}

input SimilarProductUpsertWithWhereUniqueNestedInput {
  where: SimilarProductWhereUniqueInput!
  update: SimilarProductUpdateDataInput!
  create: SimilarProductCreateInput!
}

input SimilarProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  parentId: String
  parentId_not: String
  parentId_in: [String!]
  parentId_not_in: [String!]
  parentId_lt: String
  parentId_lte: String
  parentId_gt: String
  parentId_gte: String
  parentId_contains: String
  parentId_not_contains: String
  parentId_starts_with: String
  parentId_not_starts_with: String
  parentId_ends_with: String
  parentId_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  AND: [SimilarProductWhereInput!]
  OR: [SimilarProductWhereInput!]
  NOT: [SimilarProductWhereInput!]
}

input SimilarProductWhereUniqueInput {
  id: ID
  url: String
}

type Store {
  id: ID!
  name: String!
  productFetcher: ProductFetcher
  productPages(where: ProductPageWhereInput, orderBy: ProductPageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ProductPage!]
}

type StoreConnection {
  pageInfo: PageInfo!
  edges: [StoreEdge]!
  aggregate: AggregateStore!
}

input StoreCreateInput {
  name: String!
  productFetcher: ProductFetcherCreateOneInput
  productPages: ProductPageCreateManyInput
}

type StoreEdge {
  node: Store!
  cursor: String!
}

enum StoreOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StorePreviousValues {
  id: ID!
  name: String!
}

type StoreSubscriptionPayload {
  mutation: MutationType!
  node: Store
  updatedFields: [String!]
  previousValues: StorePreviousValues
}

input StoreSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StoreWhereInput
  AND: [StoreSubscriptionWhereInput!]
  OR: [StoreSubscriptionWhereInput!]
  NOT: [StoreSubscriptionWhereInput!]
}

input StoreUpdateInput {
  name: String
  productFetcher: ProductFetcherUpdateOneInput
  productPages: ProductPageUpdateManyInput
}

input StoreWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  productFetcher: ProductFetcherWhereInput
  productPages_every: ProductPageWhereInput
  productPages_some: ProductPageWhereInput
  productPages_none: ProductPageWhereInput
  AND: [StoreWhereInput!]
  OR: [StoreWhereInput!]
  NOT: [StoreWhereInput!]
}

input StoreWhereUniqueInput {
  id: ID
}

type Subscription {
  htmlMetaData(where: HtmlMetaDataSubscriptionWhereInput): HtmlMetaDataSubscriptionPayload
  productFetcher(where: ProductFetcherSubscriptionWhereInput): ProductFetcherSubscriptionPayload
  productObservation(where: ProductObservationSubscriptionWhereInput): ProductObservationSubscriptionPayload
  productPage(where: ProductPageSubscriptionWhereInput): ProductPageSubscriptionPayload
  relatedProduct(where: RelatedProductSubscriptionWhereInput): RelatedProductSubscriptionPayload
  scriptMetaData(where: ScriptMetaDataSubscriptionWhereInput): ScriptMetaDataSubscriptionPayload
  similarProduct(where: SimilarProductSubscriptionWhereInput): SimilarProductSubscriptionPayload
  store(where: StoreSubscriptionWhereInput): StoreSubscriptionPayload
  transformation(where: TransformationSubscriptionWhereInput): TransformationSubscriptionPayload
  xhrMetaData(where: XhrMetaDataSubscriptionWhereInput): XhrMetaDataSubscriptionPayload
  fieldMetaData(where: fieldMetaDataSubscriptionWhereInput): fieldMetaDataSubscriptionPayload
}

type Transformation {
  id: ID!
  functionName: String!
}

type TransformationConnection {
  pageInfo: PageInfo!
  edges: [TransformationEdge]!
  aggregate: AggregateTransformation!
}

input TransformationCreateInput {
  functionName: String!
}

input TransformationCreateManyInput {
  create: [TransformationCreateInput!]
  connect: [TransformationWhereUniqueInput!]
}

type TransformationEdge {
  node: Transformation!
  cursor: String!
}

enum TransformationOrderByInput {
  id_ASC
  id_DESC
  functionName_ASC
  functionName_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransformationPreviousValues {
  id: ID!
  functionName: String!
}

type TransformationSubscriptionPayload {
  mutation: MutationType!
  node: Transformation
  updatedFields: [String!]
  previousValues: TransformationPreviousValues
}

input TransformationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransformationWhereInput
  AND: [TransformationSubscriptionWhereInput!]
  OR: [TransformationSubscriptionWhereInput!]
  NOT: [TransformationSubscriptionWhereInput!]
}

input TransformationUpdateDataInput {
  functionName: String
}

input TransformationUpdateInput {
  functionName: String
}

input TransformationUpdateManyInput {
  create: [TransformationCreateInput!]
  update: [TransformationUpdateWithWhereUniqueNestedInput!]
  upsert: [TransformationUpsertWithWhereUniqueNestedInput!]
  delete: [TransformationWhereUniqueInput!]
  connect: [TransformationWhereUniqueInput!]
  disconnect: [TransformationWhereUniqueInput!]
}

input TransformationUpdateWithWhereUniqueNestedInput {
  where: TransformationWhereUniqueInput!
  data: TransformationUpdateDataInput!
}

input TransformationUpsertWithWhereUniqueNestedInput {
  where: TransformationWhereUniqueInput!
  update: TransformationUpdateDataInput!
  create: TransformationCreateInput!
}

input TransformationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  functionName: String
  functionName_not: String
  functionName_in: [String!]
  functionName_not_in: [String!]
  functionName_lt: String
  functionName_lte: String
  functionName_gt: String
  functionName_gte: String
  functionName_contains: String
  functionName_not_contains: String
  functionName_starts_with: String
  functionName_not_starts_with: String
  functionName_ends_with: String
  functionName_not_ends_with: String
  AND: [TransformationWhereInput!]
  OR: [TransformationWhereInput!]
  NOT: [TransformationWhereInput!]
}

input TransformationWhereUniqueInput {
  id: ID
  functionName: String
}

type XhrMetaData {
  id: ID!
  request: Json
  propertyPath: String
  transformations(where: TransformationWhereInput, orderBy: TransformationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transformation!]
  transformedValue: String
}

type XhrMetaDataConnection {
  pageInfo: PageInfo!
  edges: [XhrMetaDataEdge]!
  aggregate: AggregateXhrMetaData!
}

input XhrMetaDataCreateInput {
  request: Json
  propertyPath: String
  transformations: TransformationCreateManyInput
  transformedValue: String
}

input XhrMetaDataCreateOneInput {
  create: XhrMetaDataCreateInput
  connect: XhrMetaDataWhereUniqueInput
}

type XhrMetaDataEdge {
  node: XhrMetaData!
  cursor: String!
}

enum XhrMetaDataOrderByInput {
  id_ASC
  id_DESC
  request_ASC
  request_DESC
  propertyPath_ASC
  propertyPath_DESC
  transformedValue_ASC
  transformedValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type XhrMetaDataPreviousValues {
  id: ID!
  request: Json
  propertyPath: String
  transformedValue: String
}

type XhrMetaDataSubscriptionPayload {
  mutation: MutationType!
  node: XhrMetaData
  updatedFields: [String!]
  previousValues: XhrMetaDataPreviousValues
}

input XhrMetaDataSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: XhrMetaDataWhereInput
  AND: [XhrMetaDataSubscriptionWhereInput!]
  OR: [XhrMetaDataSubscriptionWhereInput!]
  NOT: [XhrMetaDataSubscriptionWhereInput!]
}

input XhrMetaDataUpdateDataInput {
  request: Json
  propertyPath: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input XhrMetaDataUpdateInput {
  request: Json
  propertyPath: String
  transformations: TransformationUpdateManyInput
  transformedValue: String
}

input XhrMetaDataUpdateOneInput {
  create: XhrMetaDataCreateInput
  update: XhrMetaDataUpdateDataInput
  upsert: XhrMetaDataUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: XhrMetaDataWhereUniqueInput
}

input XhrMetaDataUpsertNestedInput {
  update: XhrMetaDataUpdateDataInput!
  create: XhrMetaDataCreateInput!
}

input XhrMetaDataWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  propertyPath: String
  propertyPath_not: String
  propertyPath_in: [String!]
  propertyPath_not_in: [String!]
  propertyPath_lt: String
  propertyPath_lte: String
  propertyPath_gt: String
  propertyPath_gte: String
  propertyPath_contains: String
  propertyPath_not_contains: String
  propertyPath_starts_with: String
  propertyPath_not_starts_with: String
  propertyPath_ends_with: String
  propertyPath_not_ends_with: String
  transformations_every: TransformationWhereInput
  transformations_some: TransformationWhereInput
  transformations_none: TransformationWhereInput
  transformedValue: String
  transformedValue_not: String
  transformedValue_in: [String!]
  transformedValue_not_in: [String!]
  transformedValue_lt: String
  transformedValue_lte: String
  transformedValue_gt: String
  transformedValue_gte: String
  transformedValue_contains: String
  transformedValue_not_contains: String
  transformedValue_starts_with: String
  transformedValue_not_starts_with: String
  transformedValue_ends_with: String
  transformedValue_not_ends_with: String
  AND: [XhrMetaDataWhereInput!]
  OR: [XhrMetaDataWhereInput!]
  NOT: [XhrMetaDataWhereInput!]
}

input XhrMetaDataWhereUniqueInput {
  id: ID
}
`
      }
    