class School {
    directions: any = [];

    addDirection(direction: string): void {
      this.directions.push(direction);
    }
  }

  class Direction {
    _name: string;
    levels: any = [];

    constructor(name: string) {
        this._name = name;
      }

    get name(): string {
      return this._name;
    }

    addLevel(level: string): void {
      this.levels.push(level);
    }
  }

  class Level {
    _name: string;
    _program: string;
    groups: any = [];

    constructor(name: string, program: string) {
      this._name = name;
      this._program = program;
    }

    get name(): string {
      return this._name;
    }

    get program(): string {
      return this._program;
    }

    addGroup(group: string): void {
      this.groups.push(group);
    }
  }

  class Group {
    directionName: string;
    levelName: string;

    _students: any = [];

    get students(): any {
      return this._students;
    }

    constructor(directionName: string, levelName: string) {
      this.directionName = directionName;
      this.levelName = levelName;
    }

    addStudent(student: string): void {
      this._students.push(student);
    }

    showPerformance(): any {
      const sortedStudents:any = this.students.toSorted(
        (a: any, b: any) => b.getPerformanceRating() - a.getPerformanceRating()
      );

      return sortedStudents;
    }
  }

  class Student {
    grades: any = {};
    attendance: any = [];
    firstName: string;
    lastName: string;
    birthYear: number;

    constructor(firstName: string, lastName: string, birthYear: number) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthYear = birthYear;
    }

    get fullName(): string {
      return `${this.lastName} ${this.firstName}`;
    }

    set fullName(value: string) {
      [this.lastName, this.firstName] = value.split(" ");
    }

    get age(): number {
      return new Date().getFullYear() - this.birthYear;
    }

    setGrade(subject: string, grade: number): void {
      this.grades[subject] = grade;
    }

    markAttendance(present: string): void {
      this.attendance.push(present);
    }

    getPerformanceRating(): number{
      const gradeValues: any = Object.values(this.grades);

      if (gradeValues.length === 0) return 0;

      const averageGrade: number =
        gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

      const attendancePercentage: number =
        (this.attendance.filter((present: string) => present).length /
          this.attendance.length) *
        100;

      return (averageGrade + attendancePercentage) / 2;
    }
  }