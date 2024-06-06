class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
    private _areas: string[] = [];
    private _lecturers: string[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): string[] {
        return this._areas;
    }

    get lecturers(): string[] {
        return this._lecturers;
    }

    addArea(area: string): void {
        this._areas.push(area);
    }

    removeArea(area: string): void {
        this._areas = this._areas.filter(a => a !== area);
    }

    addLecturer(lecturer: string): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(lecturer: string): void {
        this._lecturers = this._lecturers.filter(l => l !== lecturer);
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    private _levels: string[] = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get levels(): string[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }

    addLevel(level: string): void {
        this._levels.push(level);
    }

    removeLevel(level: string): void {
        this._levels = this._levels.filter(l => l !== level);
    }
}

class Level {
    private _groups: string[] = [];
    private _name: string;
    private _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups(): string[] {
        return this._groups;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    addGroup(group: string): void {
        this._groups.push(group);
    }

    removeGroup(group: string): void {
        this._groups = this._groups.filter(g => g !== group);
    }
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods
    private _areas: string[] = [];
    private _status: string;
    private _students: Student[] = []; // Array of Student instances
    private _directionName: string;
    private _levelName: string;

    constructor(directionName: string, levelName: string, status: string) {
        this._directionName = directionName;
        this._levelName = levelName;
        this._status = status;
    }

    get directionName(): string {
        return this._directionName;
    }

    get levelName(): string {
        return this._levelName;
    }

    get students(): Student[] {
        return this._students;
    }

    get status(): string {
        return this._status;
    }

    addArea(area: string): void {
        this._areas.push(area);
    }

    addStudent(student: Student): void {
        this._students.push(student);
    }

    removeStudent(student: Student): void {
        this._students = this._students.filter(s => s !== student);
    }

    setStatus(status: string): void {
        this._status = status;
    }

    showPerformance(): Student[] {
        return this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    }

    getSortedStudents(): Student[] {
        return this._students.toSorted((a, b) => a.fullName.localeCompare(b.fullName));
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;
    private _grades: number[] = []; // workName: mark
    private _visits: boolean[] = []; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(mark: number): void {
        this._grades.push(mark);
    }

    setVisit(present: boolean): void {
        this._visits.push(present);
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = this._grades;

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}
