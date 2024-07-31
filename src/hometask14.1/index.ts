type Uuid = number;
interface INoteUpdate {
    title: INote['title'];
    content: INote['content'];
}
interface ITodoList {
    addNewNote: (title: string, content: string) => void;
    deleteNote: (idNote: Uuid) => INote;
    editNote: (idNote:Uuid, payload: INoteUpdate) => INote;
    getNoteById: (idNote: Uuid) => INote;
    getAllNotes: () => INote[];
    markNoteAsDone: (id:Uuid) => void;
}
interface INote {
    id: Uuid;
    title: string;
    content: string;
    creationDate: Date;
    isCompleted: boolean;
    update: (payload: INoteUpdate, confirm?: boolean) => void;
    completed: () => void;
}
interface ISearch {
    searchTitle: (title: string) => INote[];
    searchContent: (content: string) => INote[];
}
interface ISort {
    sortStatus: (desc: boolean) => INote[];
    sortDate: (desc: boolean) => INote[];
}
class TodoList implements ITodoList {
    protected notes: INote[] =[];

    get allCountNotes(): number {
        return this.notes.length;
    }
    get countCompletedNotes(): number {
        return this.notes.filter((note) => note.isCompleted).length;
    }

    addNewNote(title: string, content: string): void {
        if (!title.trim() || !content.trim()) {
            throw new Error('Title and content must be not empty');
        }
        const note = new NoteDefault(title, content);
        this.notes.push(note);
    }
    deleteNote(id: Uuid): INote {
        const noteIndex = this.findNoteById(id);
        const [removeNote] = this.notes.splice(noteIndex, 1);

        return removeNote;
    }
    editNote(id:Uuid, payload: INoteUpdate): INote {
        const noteIndex = this.findNoteById(id);
        const note = this.notes[noteIndex];
        const oldNote = { ...note };
        note.update(payload);

        return oldNote;
    }
    getNoteById(id: Uuid): INote {
        return this.notes[this.findNoteById(id)];
    }
    getAllNotes(): INote[] {
        return this.notes;
    }

    markNoteAsDone(id:Uuid): void {
        this.notes[this.findNoteById(id)].completed();
    }

    private findNoteById(id: Uuid): number {
        const noteIndex = this.notes.findIndex((note) => (note.id = id));
        if (!noteIndex) {
            throw new Error(`Note not found by ${id}`);
        }
        return noteIndex;
    }
}
abstract class BaseNote implements INote {
    readonly id: Uuid = Math.random();
    readonly creationDate = new Date();

    updateDate: Date | undefined = undefined;
    isCompleted: boolean = false;
    constructor(public title: string,public content: string) {
    }

    public abstract update(payload: INoteUpdate, confirm?: boolean): void;
    public completed(): void {
        this.isCompleted = true;
    }
}

class NoteDefault extends BaseNote {
    public update(payload: INoteUpdate): void {
        if (payload.title?.trim()){
            this.title = payload.title;
        }
        if (payload.content?.trim()){
            this.content = payload.content;
        }
        this.updateDate = new Date();
    }
}
class NoteConfirm extends BaseNote {
    public update(payload: INoteUpdate, confirm:boolean): void {
        if (payload.title?.trim()){
            this.title = payload.title;
        }
        if (payload.content?.trim()){
            this.content = payload.content;
        }
        this.updateDate = new Date();
        if (confirm){
            this.isCompleted = true;
    }
}}

class TodoListSearch extends TodoList implements ISearch {
    public searchTitle(title: string): INote[] {
        return this.notes.filter((note) => note.title.includes(title));
    }
    public searchContent(content: string): INote[] {
        return this.notes.filter((note) => note.content.includes(content));
    }

}
class TodoListSort extends TodoList implements ISort {
    sortStatus(desc: boolean): INote[] {
        return this.notes.sort((a, b) => {
            if (a.isCompleted === b.isCompleted) {
                return 0;
            }
            if (desc) {
                return a.isCompleted ? -1 : 1;
            } else {
                return a.isCompleted ? 1 : -1;
            }
        });
    }
    sortDate(desc: boolean): INote[] {
        return this.notes.sort((a, b) => {
            if (desc) {
                return b.creationDate.getTime() - a.creationDate.getTime();
            } else {
                return a.creationDate.getTime() - b.creationDate.getTime();
            }
        });
    }
}

