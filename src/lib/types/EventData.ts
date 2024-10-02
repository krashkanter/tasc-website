export default interface EventData {
	id: string;
	title: string;
	image: string;
	date: Date;
	time: string | null;
	type: string | null;
	venue: string | null;
	description: string | null;
	brief:string|null;
	guests: string[];
	reportLink: string | null;
}


