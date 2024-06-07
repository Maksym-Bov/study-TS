type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
};
class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  _areas: string[] = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): string[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: string): void {
    this._areas.push(area);
  }

  removeArea(area: string): void {
    this._areas = this._areas.filter(a => a !== area);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter(l => l !== lecturer);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: string[] = [];
  _name: string;

  get levels(): string[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: string): void {
    this._levels.push(level);
  }

  removeLevel(level: string): void {
    this._levels = this._levels.filter(l => l !== level);
  }
}

class Level {
  _groups: string[] = [];
  _name: string;
  _description: string;

  get groups(): string[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
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
  _areas: string[] = [];
  _status: string;
  _students: Student[] = []; // Array of Student instances
  _directionName: string;
  _levelName: string;

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

  constructor(directionName: string, levelName: string, status: string) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._status = status;
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

type Grade = {
  ['workName']: number;
};
type Visit = {
  ['lesson']: boolean;
};
class Student {
  // implement 'set grade' and 'set visit' methods
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: Grade[] = []; // workName: mark
  _visits: Visit[] = []; // lesson: present

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  setGrade(grade: Grade): void {
    this._grades.push(grade);
  }

  setVisit(visit: Visit): void {
    this._visits.push(visit);
  }

  getPerformanceRating(): number {
    const gradeValues: Grade[] = this._grades;

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: Grade) => sum + grade.workName, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present: Visit) => present.lesson).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
