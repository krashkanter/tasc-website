export default interface FacultyCardType {
	id: string;
	image: string;
	name: string;
	email: string;
	designation: string;
	designation2: string | null;
	about: Array<string>;
}
