export enum Priority {
    LOW,
    MED,
    HIGH
}
export interface TaskItem{
    id: number;
    name: string;
    detail: string;
    priority: Priority;
    isComplete: boolean;
}