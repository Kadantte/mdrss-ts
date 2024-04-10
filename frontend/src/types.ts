export interface QueryMatcher {
	type: 'manga' | 'user' | 'group' | 'ol' | 'tl'
	value: string
}

export type Query = QueryMatcher[]
