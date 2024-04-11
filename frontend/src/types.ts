export interface QueryMatcher {
	type: 'manga' | 'user' | 'groups' | 'ol' | 'tl' | 'tags' | 'ntags'
	value: string
}

export type Query = QueryMatcher[]
