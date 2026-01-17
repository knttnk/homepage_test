declare module '@citation-js/core' {
	interface InputOptions {
		forceType?: string;
		maxChain?: number;
		generateGraph?: boolean;
		strict?: boolean;
		target?: string;
	}

	interface OutputOptions {
		format?: 'real' | 'string';
		type?: 'json' | 'html' | 'string' | 'ris';
		style?: 'csl' | 'bibtex' | 'bibtxt' | 'citation-*';
		lang?: string;
		template?: string;
		prepend?: string | ((entry: any) => string);
		append?: string | ((entry: any) => string);
		nosort?: boolean;
		// Allows any other properties for flexibility as options can be extensive
		[key: string]: any;
	}

	interface SortOptions {
		// Define specific sort options if known, otherwise any
		[key: string]: any;
	}

	interface CSLDate {
		"date-parts"?: (number | string)[][];
		"season"?: number | string;
		"circa"?: number | string | boolean;
		"literal"?: string;
		"raw"?: string;
	}

	interface CSLName {
		"family"?: string;
		"given"?: string;
		"dropping-particle"?: string;
		"non-dropping-particle"?: string;
		"suffix"?: string;
		"comma-suffix"?: string | number | boolean;
		"static-ordering"?: string | number | boolean;
		"literal"?: string;
		"parse-names"?: string | number | boolean;
	}

	// CSL-JSON item structure - renamed to Publication as requested
	interface Publication {
		id: string | number;
		type: string;

		// Standard Variables
		"abstract"?: string;
		"annote"?: string;
		"archive"?: string;
		"archive_collection"?: string;
		"archive_location"?: string;
		"archive-place"?: string;
		"authority"?: string;
		"call-number"?: string;
		"citation-key"?: string;
		"citation-label"?: string;
		"collection-title"?: string;
		"container-title"?: string;
		"container-title-short"?: string;
		"dimensions"?: string;
		"division"?: string;
		"DOI"?: string;
		"event"?: string; // Deprecated
		"event-title"?: string;
		"event-place"?: string;
		"genre"?: string;
		"ISBN"?: string;
		"ISSN"?: string;
		"jurisdiction"?: string;
		"keyword"?: string;
		"language"?: string;
		"license"?: string;
		"medium"?: string;
		"note"?: string;
		"original-publisher"?: string;
		"original-publisher-place"?: string;
		"original-title"?: string;
		"part-title"?: string;
		"PMCID"?: string;
		"PMID"?: string;
		"publisher"?: string;
		"publisher-place"?: string;
		"references"?: string;
		"reviewed-genre"?: string;
		"reviewed-title"?: string;
		"scale"?: string;
		"source"?: string;
		"status"?: string;
		"title"?: string;
		"title-short"?: string;
		"URL"?: string;
		"volume-title"?: string;
		"year-suffix"?: string;

		// Number Variables
		"chapter-number"?: string | number;
		"citation-number"?: string | number;
		"collection-number"?: string | number;
		"edition"?: string | number;
		"first-reference-note-number"?: string | number;
		"issue"?: string | number;
		"locator"?: string | number;
		"number"?: string | number;
		"number-of-pages"?: string | number;
		"number-of-volumes"?: string | number;
		"page"?: string | number;
		"page-first"?: string | number;
		"part-number"?: string | number;
		"printing-number"?: string | number;
		"section"?: string | number;
		"supplement-number"?: string | number;
		"version"?: string | number;
		"volume"?: string | number;

		// Date Variables
		"accessed"?: CSLDate;
		"available-date"?: CSLDate;
		"event-date"?: CSLDate;
		"issued"?: CSLDate;
		"original-date"?: CSLDate;
		"submitted"?: CSLDate;

		// Name Variables
		"author"?: CSLName[];
		"chair"?: CSLName[];
		"collection-editor"?: CSLName[];
		"compiler"?: CSLName[];
		"composer"?: CSLName[];
		"container-author"?: CSLName[];
		"contributor"?: CSLName[];
		"curator"?: CSLName[];
		"director"?: CSLName[];
		"editor"?: CSLName[];
		"editorial-director"?: CSLName[];
		"editor-translator"?: CSLName[];
		"executive-producer"?: CSLName[];
		"guest"?: CSLName[];
		"host"?: CSLName[];
		"illustrator"?: CSLName[];
		"interviewer"?: CSLName[];
		"narrator"?: CSLName[];
		"organizer"?: CSLName[];
		"original-author"?: CSLName[];
		"performer"?: CSLName[];
		"producer"?: CSLName[];
		"recipient"?: CSLName[];
		"reviewed-author"?: CSLName[];
		"script-writer"?: CSLName[];
		"series-creator"?: CSLName[];
		"translator"?: CSLName[];

		[key: string]: any;
	}

	export class Cite {
		constructor(data?: any, options?: InputOptions);

		/**
		 * The parsed data
		 */
		data: Publication[];

		/**
		 * Add an object to the array of objects
		 */
		add(data: any, options?: InputOptions, log?: boolean): Cite;

		/**
		 * Add an object to the array of objects asynchronously
		 */
		addAsync(data: any, options?: InputOptions, log?: boolean): Promise<Cite>;

		/**
		 * Get the current version number
		 */
		currentVersion(): number;

		/**
		 * Get formatted data from your object.
		 */
		format(format: string, ...options: any[]): string | Array<Publication>;

		/**
		 * Get formatted data from your object.
		 */
		get(options?: OutputOptions): string | Array<Publication> | Publication;

		/**
		 * Get a list of the data entry IDs
		 */
		getIds(): Array<string>;

		/**
		 * Reset the Cite object
		 */
		reset(log?: boolean): Cite;

		/**
		 * Save an image of the current version of the object
		 */
		save(): Cite;

		/**
		 * Replacement data
		 */
		set(data: any, options?: InputOptions, log?: boolean): Cite;

		/**
		 * Replacement data asynchronously
		 */
		setAsync(data: any, options?: InputOptions, log?: boolean): Promise<Cite>;

		/**
		 * Sort the dataset
		 */
		sort(method?: string[] | SortOptions, log?: boolean): Cite;

		/**
		 * Restore the second to last saved version
		 */
		undo(number?: number): Cite;

		/**
		 * Create a Cite object asynchronously
		 */
		static async(data: any, options?: InputOptions, callback?: (data: Cite) => void): Promise<Cite>;

		/**
		 * Validate input options
		 */
		static validateOptions(options: InputOptions): boolean;

		/**
		 * Validate output options
		 */
		static validateOutputOptions(options: OutputOptions): boolean;
	}
}

declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-doi';
