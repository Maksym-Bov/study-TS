// Вам необхідно написати додаток Todo list. У списку нотаток повинні
//  бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток.
//  Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.

//     Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.
//     Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.
interface ITodoList {
    addNewNote(title:string, content:string): void;
    deleteNote(idNote:number): void;
    editNote(): void;
    getNoteById(): void;
    getAllNotes(): void;
    markNoteAsDone(): void;
    getNotesInfo(): void;
    searchNote(): void;
    sortNotes(): void;
}
interface INote {
    title: string;
    content: string;
    creationDate: Date;
    editDate: Date;
    status: boolean;
    type: string;
}
class TodoList implements ITodoList {
    protected notes: INote[];


    addNewNote(): void {
        throw new Error("Method not implemented.");
    }
    deleteNote(): void {
        throw new Error("Method not implemented.");
    }
    editNote(): void {
        throw new Error("Method not implemented.");
    }
    getNoteById(): void {
        throw new Error("Method not implemented.");
    }
    getAllNotes(): void {
        throw new Error("Method not implemented.");
    }
    markNoteAsDone(): void {
        throw new Error("Method not implemented.");
    }
    getNotesInfo(): void {
        throw new Error("Method not implemented.");
    }
    searchNote(): void {
        throw new Error("Method not implemented.");
    }
    sortNotes(): void {
        throw new Error("Method not implemented.");
    }
}
class NoteDefault implements INote {
    title: string;
    content: string;
    creationDate: Date;
    editDate: Date;
    status: boolean;
    type: string;
    constructor(title: string, content: string, creationDate: Date, editDate: Date, status: boolean, type: string) {
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.editDate = editDate;
        this.status = status;
        this.type = type;
    }
}
class NoteWithConfirm implements INote {
    title: string;
    content: string;
    creationDate: Date;
    editDate: Date;
    status: boolean;
    type: string;
    constructor(title: string, content: string, creationDate: Date, editDate: Date, status: boolean, type: string) {
        this.title = title;
        this.content = content;
        this.creationDate = creationDate;
        this.editDate = editDate;
        this.status = status;
        this.type = type;
    }
}