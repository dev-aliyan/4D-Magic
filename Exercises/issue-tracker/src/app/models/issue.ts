export interface Issue {
    id: string
    title: string
    description: string
    state: string
    createdAt: Date
    updatedAt: Date
    dueDate: Date
    estimatedTime: number
    completedTime: number
    assignTo: string
    comments: string
    mentions: string
    attachments: File
}

export interface User {
    name: string
    role: string
    isAdmin: boolean
    isEngineer: boolean
    isAnalyst: boolean
}