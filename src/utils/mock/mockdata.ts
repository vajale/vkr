import { type DocumentBlock, DocumentBlockType, type Page, type Task } from "../../components/PageView/model/types";
import { type User } from "@/utils/types";

export const mock =
    "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
export const mock2 =
    "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

export const rainbowColors = [
    '#9f0000', // Красный
    '#c56300', // Оранжевый
    '#707000', // Желтый
    '#006700', // Зеленый
    '#009494', // Голубой
    '#00006e', // Синий
    '#2c0050' // Фиолетовый
];

export const mocktasks: Task[] = [
    {
        id: '1',
        content: "leee324345leee324345leee32",
        priority: '1',
        time: '00:00:00',
        date: ''
    },
    { id: '2', content: "leee574574574574573", priority: '2', time: '00:00:00', date: '' },
    { id: '3', content: "leee45", priority: '3', time: '00:00:00', date: '' },
    { id: '4', content: "leee124587-78-76-678-678-671", priority: '4', time: '00:00:00', date: '' },
];

export const mocktasks2: Task[] = [
    {
        id: '11',
        content: "leee324345leee324345leee32",
        priority: '2',
        time: '00:00:00',
        date: ''
    },
    { id: '12', content: "leee574574574574573", priority: '2', time: '00:00:00', date: '' },
    { id: '13', content: "leee45", priority: '3', time: '00:00:00', date: '' },
    { id: '14', content: "leee124587-78-76-678-678-671", priority: '4', time: '00:00:00', date: '' },
];

export const mocktasks3: Task[] = [
    {
        id: '21',
        content: "leee324345leee324345leee32",
        priority: '1',
        time: '00:00:00',
        date: ''
    },
    { id: '22', content: "leee574574574574573", priority: '2', time: '00:00:00', date: '' },
    { id: '23', content: "leee45", priority: '1', time: '00:00:00', date: '' },
    { id: '24', content: "leee124587-78-76-678-678-671", priority: '4', time: '00:00:00', date: '' },
];
export const mocktasks4: Task[] = [
    {
        id: '31',
        content: "leee324345leee324345leee32",
        priority: '3',
        time: '00:00:00',
        date: ''
    },
    { id: '32', content: "leee574574574574573", priority: '3', time: '00:00:00', date: '' },
    { id: '33', content: "leee45", priority: '4', time: '00:00:00', date: '' },
    { id: '34', content: "leee124587-78-76-678-678-671", priority: '2', time: '00:00:00', date: '' },
];

export const mockDocs1: DocumentBlock[] = [
    {
        id: "1",
        type: DocumentBlockType.TEXT,
        content: "BIDLO",
        textType: {
            variant: 'subtitle1'
        }
    },
    {
        id: "3",
        type: DocumentBlockType.LINK,
        content: "To do",
        textType: {
            variant: 'subtitle1'
        }
    }
];

export const mockDocs2: DocumentBlock[] = [
    {
        id: "4124124",
        type: DocumentBlockType.TEXT,
        content: "jkzdvkasfvkjsdvbnk",
        textType: {
            variant: 'subtitle1'
        }
    },
    {
        id: "65iuj5jrs",
        type: DocumentBlockType.TEXT,
        content: "52125512",
        textType: {
            variant: 'h5'
        }
    },
    {
        id: "ewrewr",
        type: DocumentBlockType.CODE,
        content: "xcbxcbxcb",
        textType: {
            variant: 'subtitle1'
        }
    },
    {
        id: "1636236242466",
        type: DocumentBlockType.TODO,
        content: "To Do",
        todos: [
            { id: '1241412', title: 'gasgas', completed: false },
            { id: '6243634436', title: '52234523', completed: false },
            { id: '32523236', title: 'gas236gas', completed: false },
            { id: '521125257dsgdsg125981', title: 'gasfsafa', completed: true },
            { id: '521125257123423425981', title: 'gasasfasfagas', completed: false },
        ],
        textType: {
            variant: 'subtitle1'
        }
    },
];

export const mockPage1: Page = {
    id: 'ssaas',
    documentBlocks: mockDocs1,
    parent: "bro"
};

export const mockPage2: Page = {
    id: 'ssaas',
    documentBlocks: mockDocs2,
    parent: "ssaas"
};

export const mockTasksData: Page = {
    id: 'ssaas',
    documentBlocks: mockDocs2,
    parent: "ssaas"
};

export const mockUsersData: User[] = [
    { id: '1241241225', username: 'balls', avatar: 'none' },
    { id: '214124', username: 'big', avatar: 'none' },
    { id: '1241241225', username: 'black', avatar: 'none' },
];
